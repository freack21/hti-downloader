# HTML-to-img Downloader

## 📑 Description

I have created a project [HTML-to-img](https://github.com/freack21/html-to-img) to create an HTML page that the element in it can be used as an image. This time I made a project to do a scrapping assignment and take downloadable links from the images that have been created.

## 📚 Libraries

## 📚 Libraries Used

This project utilizes several [Node.js](https://nodejs.org/en) libraries:

| Library          | Purpose                                                                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `express`        | Acts as the primary framework for building the backend, managing routes, and serving API endpoints.                                                                                                             |
| `puppeteer-core` | JavaScript library which provides a high-level API to control Chrome or Firefox over the DevTools Protocol or WebDriver BiDi. Puppeteer runs in the headless (no visible UI) by default. Used for scrapping job |

## 🏃‍➡️ How To Run

1. Clone this GitHub Repository

   ```https
   git clone https://github.com/freack21/hti-downloader.git
   ```

   or

   ```ssh
   git clone git@github.com:freack21/hti-downloader.git
   ```

2. Change directory to `hti-downloader` folder

   ```
   cd hti-downloader
   ```

3. You can configure your `env.json` with your own preferences

4. Install dependencies

   ```
   npm install
   ```

5. Run the project by execute this command

   ```
   npm run start
   ```

## ⚙️ Configuration

The `env.json` contains several configuration, such as:

| Variable          | Value                                                              |
| ----------------- | ------------------------------------------------------------------ |
| `executable_path` | **(required)** Chrome executable path for `puppeteer-core` library |
| `port`            | (default: 3000) Port for the running server                        |
| `base_url`        | The url of html-to-img service                                     |
