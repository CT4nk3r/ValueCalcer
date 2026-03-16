#!/bin/bash
set -e

echo "Building Android release..."
cd android
./gradlew assembleRelease
echo "Android release build complete."
echo "Output: android/app/build/outputs/apk/release/"
