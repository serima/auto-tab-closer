## Auto Close Tabs - Chrome Extension

This is a Chrome extension that automatically closes browser tabs after a user-defined time period. Users can customize the time (in minutes) before a tab is closed through the settings UI.

### Features

- Automatically closes tabs after a specified number of minutes.
- Customizable time setting through the extension options page.
- Supports PC sleep mode: the countdown will continue after waking up.
- Lightweight and easy to use.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/serima/auto-close-tabs.git
   ```

2. Open Google Chrome and navigate to `chrome://extensions/`.

3. Enable **Developer mode** in the top-right corner.

4. Click on **Load unpacked** and select the folder where you cloned this project.

5. The extension will be installed, and you can find the icon in your Chrome toolbar.

### Usage

1. Click the extension icon in the toolbar to open the settings page.
2. Enter the number of minutes after which you want the tab to close.
3. Click the **Save** button to apply your settings.

The extension will now automatically close tabs based on your settings.

### Customization

To customize the tab close time:
1. Go to the extension settings page via the toolbar icon.
2. Input a time (between 1 and 120 minutes) in the provided field.
3. Save the settings, and the tabs will close automatically after the specified time.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
