/**
 * Authoritative interface component registry for AXON.
 * Dynamically resolves interface components for both live rendering
 * and offscreen interface capture staging.
 *
 * Supports runtime registration so future tools and interfaces work
 * automatically without manual patches to capture engines.
 */
import React from 'react';
import { DualPaneContainer } from '../components/DualPaneContainer';
import { ToolsMenuScreen } from '../screens/ToolsMenuScreen';
import { AxonCodeScreen } from '../screens/AxonCodeScreen';
import { AutomationScreen } from '../screens/AutomationScreen';
import { VideoEditorScreen } from '../screens/VideoEditorScreen';
import { NotesScreen } from '../screens/NotesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AccountScreen } from '../screens/AccountScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { TextToolsScreen } from '../screens/tools/TextToolsScreen';
import { CalculationToolsScreen } from '../screens/tools/CalculationToolsScreen';
import { ColorToolsScreen } from '../screens/tools/ColorToolsScreen';
import { ImageToolsScreen } from '../screens/tools/ImageToolsScreen';
import { FileConversionToolsScreen } from '../screens/tools/FileConversionToolsScreen';
import { StorageDiagnosticsScreen } from '../screens/StorageDiagnosticsScreen';
import { SpeechRateAnalysisScreen } from '../screens/tools/SpeechRateAnalysisScreen';
import { OfflineBibleScreen } from '../screens/tools/OfflineBibleScreen';
import { InterfaceCaptureScreen } from '../screens/tools/InterfaceCaptureScreen';
import { HamburgerMenu } from '../components/HamburgerMenu';
import { StorageOnboardingModal } from '../components/storage/StorageOnboardingModal';
import { ProjectSwitcherModal } from '../components/ProjectSwitcherModal';

// Wrapper components for modals/drawers when staged in isolation
const StagedNavigationMenu: React.FC = () => (
  <div className="relative w-[320px] h-[932px] bg-neutral-900 border-r border-neutral-800 flex flex-col overflow-hidden">
    <HamburgerMenu isOpen={true} onClose={() => {}} />
  </div>
);

const StagedStorageOnboarding: React.FC = () => (
  <div className="relative w-[430px] min-h-[600px] bg-neutral-950 flex items-center justify-center p-4">
    <StorageOnboardingModal isOpen={true} onClose={() => {}} canDismiss={true} />
  </div>
);

const StagedProjectSwitcher: React.FC = () => (
  <div className="relative w-[430px] min-h-[600px] bg-neutral-950 flex items-center justify-center p-4">
    <ProjectSwitcherModal isOpen={true} onClose={() => {}} />
  </div>
);

// Internal dynamic component registry
const registry = new Map<string, React.ComponentType<any>>();

// Pre-populate with all core AXON screens and tools
registry.set('axon', DualPaneContainer);
registry.set('tools', ToolsMenuScreen);
registry.set('code', AxonCodeScreen);
registry.set('automation', AutomationScreen);
registry.set('video_editor', VideoEditorScreen);
registry.set('notes', NotesScreen);
registry.set('settings', SettingsScreen);
registry.set('account', AccountScreen);
registry.set('notifications', NotificationsScreen);
registry.set('tool_text', TextToolsScreen);
registry.set('tool_calc', CalculationToolsScreen);
registry.set('tool_units', CalculationToolsScreen);
registry.set('tool_colors', ColorToolsScreen);
registry.set('tool_images', ImageToolsScreen);
registry.set('tool_files', FileConversionToolsScreen);
registry.set('tool_speech_rate', SpeechRateAnalysisScreen);
registry.set('tool_bible', OfflineBibleScreen);
registry.set('storage', StorageDiagnosticsScreen);
registry.set('tool_interface_capture', InterfaceCaptureScreen);

// Overlay interfaces
registry.set('hamburger-drawer', StagedNavigationMenu);
registry.set('storage-onboarding-modal', StagedStorageOnboarding);
registry.set('project-switcher-modal', StagedProjectSwitcher);

/**
 * Register or update an interface component dynamically at runtime.
 * Any new tool, plugin, screen, or view added in the future can call this
 * to become immediately captureable and renderable.
 */
export function registerInterfaceComponent(
  routeOrId: string,
  component: React.ComponentType<any>
): void {
  registry.set(routeOrId, component);
}

/**
 * Unregisters an interface component.
 */
export function unregisterInterfaceComponent(routeOrId: string): void {
  registry.delete(routeOrId);
}

/**
 * Resolves the React component for a given interface route or ID.
 * Returns null if not registered.
 */
export function getInterfaceComponent(
  routeOrId: string
): React.ComponentType<any> | null {
  return registry.get(routeOrId) || null;
}

/**
 * Checks if a component is registered for a given interface route or ID.
 */
export function hasInterfaceComponent(routeOrId: string): boolean {
  return registry.has(routeOrId);
}

/**
 * Returns all registered interface routes/IDs.
 */
export function getAllRegisteredComponentKeys(): string[] {
  return Array.from(registry.keys());
}
