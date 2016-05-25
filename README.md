# j1.io
This is the repository for my personal website, which I've made to look like a standard terminal. This site has multiple pages including and automatic resume grabber, and Spotify playlist integration. It uses [Typed.js](http://www.mattboldt.com/demos/typed-js/) to accomplish this, along with my own custom styling. j1.io is built using [Node.js](https://nodejs.org/), a JavaScript runtime built on the V8 engine.

## Components
- NPM modules
  - [`express`](http://expressjs.com/) - j1.io uses Express as it's web application framework. Express does the routing, request handling, and serving of pages for my website.
  - [`nib`](http://nibstyl.us/) - Stylus CSS mixins.
  - [`pug`](http://jade-lang.com/) - Formerly Jade, Pug is a templating engine which makes it easy to write simple, readable layouts for HTML and pass data into them.
  - [`request`](https://github.com/request/request) - Request library which makes it easy to send HTTP requests. j1.io uses this library to work with my resume on Google Docs.
  - [`spotify-web-api-node`](https://github.com/thelinmichael/spotify-web-api-node) - Spotify API wrapper used to obtain playlist data from Spotify.
  - [`stylus`](http://stylus-lang.com/) - A fantastic CSS generator which allows for very simple CSS files.
- `Dockerfile` - Docker script for creating a container for j1.io to deploy.
- `/bin` - Contains processing and other functions to keep clutter out of server files including custom Spotify API processing functions.
- `/public` - Favicon files, Stylus files, compiled CSS, and additional JavaScript libraries (Typed.js and jQuery).
- `/views` - Contains view files which are used by Pug to render HTML pages for clients. 
- `package.json` - Package information including dependencies for NPM.
- `server.js` - Main server file which starts Express, compiles necessary files, and handles requests.

## Test Environment
1. CentOS 7
2. Node.js 4.0.0
3. NPM 2.14.2
4. Docker 1.9.1
5. Nginx 1.6.3

## Deployment
### Docker (Recommended)
To deploy j1.io using [Docker](https://www.docker.com/), you must first have docker installed for your system.

1. Clone this repository: `$ git clone https://github.com/jswny/j1.io.git`
2. If you would like to connect j1.io to your Spotify account, you must first [generate a `client ID` and `client secret`](https://developer.spotify.com/my-applications/) for your application (do not share these).

  1. Create a directory called `config` in the root of the repository that you have cloned.
  2. Create a file `config.js` in that directory and structure it as follows using your client ID, and client secret:
    ```
    var clientId = '<your client ID here>'
    var clientSecret = '<your client secret here>'
    
    module.exports = {
      clientId: clientId,
      clientSecret: clientSecret
    }
    ```
  3. If you do not want to use spotify, simply comment out the following line in `server.js` which is `var s = require('./bin/spotify.js')`
3. Change your working directory so that you are inside the cloned repository: `$ cd j1.io`
4. Build the Docker image like so: `docker build -t <your username>/j1.io`
5. Run the application and map it's internal port to any public port you would like, I'll be using the default web server port (port 80): docker run -p 80:3000 -d --name j1.io <your username>/j1.io`
6. If you would like to use an automatic deployment script, you can try the one I've created [here](https://gist.github.com/jswny/d443c9af055d53229068b81014af825f) however you may want to configure the script before running it.

### Manual Deployment
This method is not recommended because it is highly dependent on your system configuration. For example some versions of Node may not support the HEREDOC syntax used in `bin/functions.js`.

1. Ensure that you have Node.js, NPM, and Nginx installed on your system (see testing environment).
2. Clone this repository: `$ git clone https://github.com/jswny/j1.io.git`
3. Inside the cloned repository, install the required modules with `$npm install`
4. Place the following configuration file `j1.io.conf` inside your Nginx configuration directory (for CentOS that is `/etc/nginx/conf.d`):
  ```
  server {
    listen 80; # you can change this to any port you would like your server to respond to
    server_name <your domain>;
    location / {
      proxy_pass http://127.0.0.1:3000;
    }
  }
  ```
5. Restart Nginx (`$ systemctl restart nginx`), or start it if you have not yet: `$ systemctl start nginx`
6. Start your j1.io server using your preferred method.
  1. If you would like to start it the normal way, use `$ npm start`
  2. If you would like to use a process manager like [forever](https://github.com/foreverjs/forever) (recommended), do the following:
    1. `$ npm install forever -g`
    2. `forever start server.js`
