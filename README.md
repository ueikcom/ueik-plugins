# UEIK Official Plugins

This repository contains the official collection of plugins for the GaiOS/UEIK ecosystem.

## Architecture

This is a delegated sub-registry. The main registry (`ueik-releases`) points to the `plugins.json` in this repository.

### Adding a new plugin:
1. Create a new directory for your plugin (e.g., `todo`).
2. Add `main.js` and `README.md` inside that directory.
3. Add a new entry to `plugins.json` in the root of this repository.

The marketplace client will automatically parse the structure and render the plugins dynamically.
