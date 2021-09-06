The whole system test on the virtual machine on the cloud (ubuntu 20.04 LTS virtual machine image). The front-end and back-end of the system are constructed and installed based on the virtual machine image environment.

(1).Back-end Setup
Use python3.7 or higher
Use the latest version of the flask framework
Use sqlalchemy as the database interface

The specific instructions are as follows:
cd ./comp9323/
sudo apt-get update
pip3 install flask==1.0.2
pip3 install flask_script
pip3 install sqlalchemy
pip3 install flask_sqlalchemy
pip3 install flask_cors
pip3 install flask_restx
pip3 install flask_restplus
pip3 uninstall Werkzeug
pip3 install Werkzeug==0.16.1
pip3 install zoomus

After installing all dependent packages, use:
python3 app.py run
Start the back-end framework.

(2).Front-end Setup
in ./comp9323/ cd ./group14-front/
In the front-end part, you need to install node.js and react framework before you can use it. The specific instructions are as follows:
sudo apt install npm
sudo npm install -g yarn

# Getting Started with Online Management Sysstem

This project was using React with bootstrap.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Before runs the app you need to install required packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.




If you encounter any problems with the system establishment, please contact Weiqiang Shi via z5188794@ad.unsw.edu.au