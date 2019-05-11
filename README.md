# Discount App Admin Panel

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

- Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 
- **IMPORTANT** For a production build `ng build --prod` is likely to result in a memory error
- Please use `npm run prod-build` instead

## Prototype Login Credentials

You can login with either of the two credentials mentioned below listed in `username` : `password` format
* `admin@test.com` : `password`

The view will display according to different user type('old', 'new').

To edit the login credentials you can go to `src/assets/data/UserCredentials.json` and updated the SHA-256 hashed credentials. Note the `secret` for SHA-256 hashing to be used is `discount`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
