FROM strongloop/node

# You start off as the 'strongloop' user.
# If a RUN command needs root, you can use sudo

# In addition to standard Linux commands you also have access to node, npm,
# and slc commands

# It is common to copy your current

ADD . /home/node-admin

WORKDIR /home/node-admin

ENV NODE_ENV production

RUN sudo npm install

WORKDIR /home/node-admin

CMD ["node", "." ]

