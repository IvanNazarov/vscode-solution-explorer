'use strict';

import * as vscode from "vscode";
import { EventAggregator } from "./events";
import { SolutionExplorerProvider } from "./SolutionExplorerProvider";
import { SolutionExplorerCommands } from "./SolutionExplorerCommands";
import { SolutionExplorerFileWatcher } from "./SolutionExplorerFileWatcher";
import * as SolutionExplorerConfiguration from "./SolutionExplorerConfiguration";
import { SolutionExplorerOutputChannel } from "./SolutionExplorerOutputChannel";

var eventAggregator, solutionExplorerProvider, solutionExplorerCommands, solutionExplorerFileWatcher, solutionExplorerOutputChannel;

export function activate(context: vscode.ExtensionContext) {
    const paths = vscode.workspace.workspaceFolders.map(w => w.uri.fsPath) || [];
    eventAggregator = new EventAggregator();
    solutionExplorerProvider = new SolutionExplorerProvider(context, paths, eventAggregator);
    solutionExplorerCommands = new SolutionExplorerCommands(context, solutionExplorerProvider);
    solutionExplorerFileWatcher = new SolutionExplorerFileWatcher(eventAggregator);
    solutionExplorerOutputChannel = new SolutionExplorerOutputChannel(eventAggregator);

    SolutionExplorerConfiguration.register();
    solutionExplorerProvider.register();
    solutionExplorerCommands.register();
    solutionExplorerFileWatcher.register();
    solutionExplorerOutputChannel.register();
}

export function deactivate() {
    solutionExplorerProvider.unregister();
    solutionExplorerFileWatcher.unregister();
    solutionExplorerOutputChannel.unregister();
}