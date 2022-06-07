# README

This is a demo photo galleries app using React + Ruby on Rails

## Introduction
We can view the list of all photos, create new photo and delete the photo.

The app has some basic validations like requiring the photo's `title` and `source` field.

The FE was built using React and integrated with the Rails project using `react-rails` gem (https://github.com/reactjs/react-rails)

## Stack
+ Ruby on Rails
+ React
+ MaterialUI

## Ruby version
3.0.3

## Setup
```
  bundle install
  rails db:setup
  yarn install
```

### Running
+ Rails: `rails s`

+ Webpacker: `./bin/webpack-dev-server`
