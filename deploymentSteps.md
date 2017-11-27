# Steps to deploy bot
CSC 510 - BotsUP

To deploy the bot, follow the steps below:

## 1. Create an enviroment

Create a environment to deploy the bot. As we found it convenient to use VCL, the steps below work best on the "Ubuntu 16.04 LTS Base" environment present on VCL, which already has the latest packages installed and also has 2GB RAM. We assume you are using the same. 

Note: The bot does get deployed on vagrant boxes (trusty64) as well. Though we feel the VCL environment could do better as it meets the minimum requirements our static analysis tool needs.

Minimum Requirements for the static analyis tool Sonarqube that the deployment script does not handle:
- Minimum 2GB RAM (3 GB recommended). 
More information about SonarQube requirements [here](https://docs.sonarqube.org/display/SONAR/Requirements).

## 2. Make the environment Deploy-ready

What we mean by deploy-ready is that there are certain steps before running the playbook that needs to be done manually.

* Generating ssh keys of the environment and adding it to the Git Repo needed to be cloned
    As we are cloning Git Repo in our ansible playbook to deploy the application, the ssh public key of the machine you are cloning it into needs to be added to the GitHub settings. The following are the steps to do so:
    

    Run the command on the VCL environment:

    ```
    user@virtualenv$ ssh-keygen
    ```

    You will then be prompted to enter some information. You can hit `Enter` every time to skip to defaults. Now, the public and private keys are generated. Copy the public key from the file using the following command:

    ```
    user@virtualenv$ cat ~/.ssh/id_rsa.pub
    ```

    and add the ssh key to your GitHub profile settings at https://github.ncsu.edu/settings/keys.

    Now the GitHub repo can be cloned.

* Generating ssh keys of the configuration management server and adding it to VCL to run ansible playbook
    As we are running the ansible playbook from a Configuration Management Server (ansible deployed on say a vagrant env), we need to authorize this configuration management server to connect to the VCL environment. This can be achieved by creating the ssh public key of the configuration management server and adding it to VCL using the following commands:

    ```
    user@ansible$ ssh-keygen
    ```

    You will then be prompted to enter some information. You can hit `Enter` every time to skip to defaults.
    To add the generated private key to VCL, use the following command:

    ```
    user@ansible$ ssh-copy-id user@virtualenvIP
    ```

    Here, `user` is your unityID and `virtualenvIP` is the VCL environment IP address.  
    

## 3. Create inventory file

   You need to have ansible installed on the configuration management server before running the playbook. Click [here](https://github.com/CSC-DevOps/CM/blob/master/Ansible.md) for instructions.
    Once you have ansible installed, make an inventory file having the following contents:  

    ```
    [node]
    #VCL_IP# ansible_ssh_user=#unityid#
    ```
      
   This will run the ansible playbook on the node (The VCL machine) specified in the inventory.

## 4. Adding Slack and APIAI tokens

   Create an app on Slack, add a bot user and get the API token of the Slack bot to authorize the application. Add it to the playbook [bot-deploy.yml](bot-deploy.yml) in the `SLACKTOKEN` entry.

    Also, we need to give the slack bot certain permissions to read and write files which have been uploaded to it. We provide file:read and file:write permissions to the bot so that the bot can access the files we upload to it. Create the token and add it to the playbook in the `SLACKBEARERTOKEN` entry.

   We have also trained APIAI to respond to certain messages and give us the intent. The APIAI token goes into the playbook in the `APIAITOKEN` entry. This is not to be shared (security issues) and hence we have left it out of this repository.

## 5. Running the playbook

   Now that everything has been set up, we can now run the playbook using the command:

    ```
    user@ansible$ ansible-playbook -i inventory bot-deploy.yml
    ```

   The environment along with the bot will be successfully deployed on Slack, and you can now use the bot for learning to code!
