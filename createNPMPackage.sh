#!/bin/bash
set -e
set -x

ROOT=$(pwd)

unset CI

versions=("0.70" "0.69" "0.68" "0.67" "0.66")
version_name=("70" "69" "68" "67" "66")

for index in {0..4}
do
  yarn add react-native@"${versions[$index]}"
  for for_hermes in "True" "False"
  do
    engine="jsc"
    if [ "$for_hermes" == "True" ]; then
      engine="hermes"
    fi
    echo "engine=${engine}"

    cd android
    ./gradlew clean

    CLIENT_SIDE_BUILD="False" JS_RUNTIME=${engine} REANIMATED_PACKAGE_BUILD="1" ./gradlew :assembleRelease --no-build-cache --rerun-tasks

    cd $ROOT

    rm -rf android/react-native-reanimated-"${version_name[$index]}-${engine}".aar
    cp android/build/outputs/aar/*.aar android/react-native-reanimated-"${version_name[$index]}-${engine}".aar
  done
done

yarn add react-native@"${versions[0]}" --dev

cp -R android/build build_output
cd android && REANIMATED_PACKAGE_BUILD="1" ./gradlew clean && cd ..
yarn run type:generate
npm pack

rm -rf ./lib

echo "Done!"
