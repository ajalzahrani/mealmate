cd mealmate-app
npm run build
cd ..
tar czf mealmate-app.tar.gz mealmate-app/build
tar czf mealmate-api.tar.gz mealmate-api/server.js mealmate-api/package.json mealmate-api/package-lock.json
scp mealmate-app.tar.gz mealmate-api.tar.gz aalzahrani@212.132.115.36:~
rm mealmate-app.tar.gz mealmate-api.tar.gz

ssh aalzahrani@212.132.115.36 << 'ENDSSH'
pm2 stop all
rm -rf mealmate
mkdir mealmate
mv mealmate-app.tar.gz mealmate-api.tar.gz mealmate
cd mealmate
tar xf mealmate-app.tar.gz
tar xf mealmate-api.tar.gz
rm mealmate-app.tar.gz
rm mealmate-api.tar.gz
cd mealmate-api
npm install
pm2 start all
ENDSSH