cd /home/jake/ZDC.Frontend

npm install

npm run build

sudo mv build /var/www/ZDC.Frontend/

sudo cp .env /var/www/ZDC.Frontend/.env

cd /var/www/ZDC.Frontend

sudo chmod -R 755 *

