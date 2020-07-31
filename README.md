# iotapp-home-security-dapp

## Install Dependencies
```
npm install
```

## Project Setup
In the ```HelloWorld.vue``` file (around line 107), add your channel app keys to the API functions like so: 

#### Examples
```javascript
    iotapp.getPrivateChain("myOz8FZXhT4lBzJplmXtUbneP8eeXpSp","3imNnMduakmu6JmFafIxnu8WJj28BjQI")

    iotapp.getLatestTx("myOz8FZXhT4lBzJplmXtUbneP8eeXpSp","3imNnMduakmu6JmFafIxnu8WJj28BjQI")
```

Also, add your app keys to the ```pollData() ``` function, around line 152:

```javascript
    pollData() {
      this.polling = setInterval(() => {
        iotapp.getLatestTx("myOz8FZXhT4lBzJplmXtUbneP8eeXpSp", "3imNnMduakmu6JmFafIxnu8WJj28BjQI")
          .then((data) => (this.latestData = data))
          .catch((err) => console.log("Error occurred:", err));
      }, 2000);
    },
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
