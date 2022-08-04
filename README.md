# Space Cat

Space Cat demo project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
node.js, npm, Android Sdk, Android Emulator
```

### Installing React-Native

A step by step series of examples that tell you how to get a development env running

Install dependencies from package.json

```
npm install
```

Setup Android and IOS on your device

```
Check the link for more info https://facebook.github.io/react-native/docs/getting-started
```

Finally run dev server on Android or iOS

```
npm run android or npm run ios
```

## Deployment

### For React-Native

Setup Keystore
```
keytool -genkey -v -keystore your_key_name.keystore -alias your_key_alias -keyalg RSA -keysize 2048 -validity 10000
```
Setup APK

```
cd android && ./gradlew assembleRelease
```

## Built With

* [React Native](https://reactnative.dev/) - Mobile Application

## Authors

* **Luka Patarčić** - *web developer* - [LukaPatarcic](https://github.com/LukaPatarcic)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
