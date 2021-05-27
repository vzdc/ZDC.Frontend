cd /home/jake/ZDC.Frontend

npm install

npm run build

sudo rm -rf /var/www/ZDC.Frontend

sudo mv build /var/www/ZDC.Frontend/

sudo cp .env /var/www/ZDC.Frontend/.env

