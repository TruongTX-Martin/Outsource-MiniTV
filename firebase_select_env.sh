#!/usr/bin/env bash
#select dev: ./firebase_select_env.sh develop
#select production:  ./firebase_select_env.sh production

if [ “$1” == “production” ];
then
  echo “Switching to Firebase Production environment”
  yes | cp -rf firebase_environments/production/google-services.json android/app
  yes | cp -rf firebase_environments/production/GoogleService-Info.plist ios
elif [ “$1” == “develop” ]
then
  echo “Switching to Firebase Dev environment”
  yes | cp -rf firebase_environments/develop/google-services.json android/app
  yes | cp -rf firebase_environments/develop/GoogleService-Info.plist ios
fi 