const { Keystone } = require('@keystonejs/keystone');
const { GraphQLApp } = require('@keystonejs/app-graphql');
const { AdminUIApp } = require('@keystonejs/app-admin-ui');
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose');
const { PasswordAuthStrategy } = require('@keystonejs/auth-password');
const PROJECT_NAME = 'langotv';
const adapterConfig = { mongoUri: process.env.MONGO_URI };


/**
 * You've got a new KeystoneJS Project! Things you might want to do next:
 * - Add adapter config options (See: https://keystonejs.com/keystonejs/adapter-mongoose/)
 * - Select configure access control and authentication (See: https://keystonejs.com/api/access-control)
 */

const UserSchema = require('./lists/User.js');
const VideoSchema = require('./lists/Video.js');
const VocabularySchema = require('./lists/Vocabulary.js');

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
});

const isAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);
const isLoggedIn = ({ authentication: { item: user } }) => Boolean(user);

const isOwner = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return {
    $or: [
      { 'owner.id': user.id },
      { 'owner.isAdmin': true },
    ],
  };
};

const isAdminOrOwner = ({ authentication: { item: user } }) => {
  if (!user) {
    return false;
  }
  return {
    $or: [
      { 'owner.id': user.id },
      { 'owner.isAdmin': true },
    ],
  };
};

const access = {isAdmin,isLoggedIn , isOwner, isAdminOrOwner};

keystone.createList('User', {
  fields: UserSchema.fields,
  access:  {
    read: access.isAdminOrOwner,
    update: access.isAdminOrOwner,
    create: access.isAdminOrOwner,
    delete: access.isAdminOrOwner,
    auth: true,
  },
});
keystone.createList('Video', {
  fields: VideoSchema.fields,
  access: {
    read: access.isLoggedIn,
    update:  access.isAdminOrOwner,
    create:  access.isAdminOrOwner,
    delete:  access.isAdminOrOwner,
    auth: true,
  },
});
keystone.createList('Vocabulary', {
  fields: VocabularySchema.fields,
  access: {
    read: access.isLoggedIn,
    update:  access.isAdminOrOwner,
    create:  access.isAdminOrOwner,
    delete:  access.isAdminOrOwner,
    auth: true,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password',
  },
});

module.exports = {
  keystone,
  apps: [new GraphQLApp(), new AdminUIApp({ name: PROJECT_NAME, enableDefaultRoute: true , authStrategy , isAccessAllowed: isAdminOrOwner }),],
};
