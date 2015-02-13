cp -rf weather_app website
rm -rf website/weather_app/.git
cd website
git add . --all
git commit -m "automated"
git push origin master

