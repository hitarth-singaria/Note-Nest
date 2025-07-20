# Note-Nest
Full Stack web app developed using MERN stack to add notes

To run Note Nest on Linux EC2 instance, do the following steps: 

EC2 Deployment Guide for a MERN Application
This guide provides the step-by-step commands to install the necessary software on an Amazon Linux 2 EC2 instance to host your MERN stack application.

Prerequisites
You have an active AWS account.

You have launched an Amazon Linux 2 EC2 instance and can connect to it via SSH.

Your application code is available in a GitHub repository.

You have configured your EC2 instance's Security Group to allow inbound traffic on:

SSH (Port 22): To connect to your instance.

HTTP (Port 80): For public web traffic.

HTTPS (Port 443): For secure web traffic (optional, for later).

Step 1: Connect to Your EC2 Instance
First, connect to your instance using SSH. You'll use the .pem key file you downloaded when you launched the instance.

# Replace 'your-key.pem' and 'your-ec2-ip-address' with your actual values
ssh -i "your-key.pem" ec2-user@your-ec2-ip-address

Step 2: Update the System and Install Git
Always start by updating the server's packages. Then, install Git to clone your project.

# Update all installed packages
sudo yum update -y

# Install Git
sudo yum install git -y

Step 3: Install Node.js and npm
We'll use nvm (Node Version Manager) to install Node.js. This makes it easy to manage and switch between Node versions.

# Download and run the nvm installation script
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

# Activate nvm for the current session
. ~/.nvm/nvm.sh

# Install the latest Long-Term Support (LTS) version of Node.js
nvm install --lts

# Verify the installation
node -v
npm -v

Step 4: Install and Configure MongoDB (Alternative: Use MongoDB Atlas)
While you can install MongoDB directly on your EC2 instance, it is highly recommended to use a managed database service like MongoDB Atlas (which you signed up for). It handles backups, security, and scaling for you.

If you use MongoDB Atlas, you don't need to install anything on EC2. You'll simply provide your application with the Atlas connection string.

Step 5: Install PM2 (Process Manager)
PM2 is a process manager for Node.js applications. It will keep your app running in the background, automatically restart it if it crashes, and help manage logs.

# Install PM2 globally using npm
sudo npm install pm2 -g

Step 6: Clone and Set Up Your Application
Now, clone your project from GitHub and install its dependencies.

# Clone your repository
git clone https://github.com/your-username/note-taking-app.git

# Navigate into your project directory
cd note-taking-app

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Build the React app for production
# This creates an optimized 'build' folder
npm run build

Step 7: Install and Configure Nginx (Reverse Proxy)
Nginx will act as a "front door" (a reverse proxy). It will listen for public traffic on port 80 and forward it to your Node.js application, which will be running on a different port (e.g., 5000).

# Install Nginx
sudo amazon-linux-extras install nginx1 -y

# Start the Nginx service
sudo systemctl start nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx

Summary of Installed Software
By the end of this process, your Amazon Linux EC2 instance will have:

Git: To pull your code.

NVM, Node.js & npm: To run your backend and build your frontend.

PM2: To keep your Node.js server running 24/7.

Nginx: To manage incoming web traffic and serve your application.

Your next steps would be to configure Nginx to point to your application and then start your server using PM2.
