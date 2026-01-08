export const UserModel = {
  collection: "Users",

  schema: {
    name: String,
    email: String,
    password: String,
    posts: Array,
    createdAt: Date,
  },
};
