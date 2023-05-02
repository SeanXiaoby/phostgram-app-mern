const sample_phosts = [
  {
    id: "100001",
    author: {
      id: "2000001",
      username: "SeanSheep",
      avatar:
        "https://avatars.githubusercontent.com/u/52678828?s=400&u=ab9a7f86686e9e800fd21a7d0ceb55f1dbddd1c3&v=4",
    },
    img: "https://pic4.zhimg.com/80/v2-0124b4257f6b8c303ba3f87d89f92073_720w.webp",
    text: "This is a test post and this is a very good post. This is about the actor of Professor Snape who is a one of my favourite character in the whole series of HP",
    created_at: "2023-05-01 23:01:26",
    comments: [
      {
        id: "3000001",
        author: {
          id: "2000002",
          username: "JohnDoe",
          avatar: "https://i.pravatar.cc/150?img=66",
        },
        text: "This is a test comment",
        created_at: "2020-11-13 09:12:25",
      },
      {
        id: "3000003",
        author: {
          id: "2000001",
          username: "SeanSheep",
          avatar: "https://i.pravatar.cc/150?img=66",
        },
        text: "This is a test comment on another post by another user who is not the author of the post but the author of the comment on the post, which is a very long sentence. I hope this is long enough to test the UI of the comment section.",
        created_at: "2016-01-01 00:00:00",
      },
      {
        id: "3000002",
        author: {
          id: "2000003",
          username: "JaneDoe",
          avatar: "https://i.pravatar.cc/150?img=66",
        },
        text: "This is another test comment",
        created_at: "2016-01-01 00:00:00",
      },
    ],
  },
  {
    id: "100002",
    author: {
      id: "2000002",
      username: "JohnDoe",
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    img: "https://www.slashonline.com/wp-content/uploads/2021/10/20210530-2161-1-1.jpg",
    text: "This is another test post",
    created_at: "2016-01-01 00:00:00",
    comments: [
      {
        id: "3000003",
        author: {
          id: "2000001",
          username: "SeanSheep",
          avatar: "https://i.pravatar.cc/150?img=66",
        },
        text: "This is a test comment on another post by another user who is not the author of the post but the author of the comment on the post, which is a very long sentence. I hope this is long enough to test the UI of the comment section.",
        created_at: "2016-01-01 00:00:00",
      },
      {
        id: "3000002",
        author: {
          id: "2000001",
          username: "SeanSheep",
          avatar: "https://i.pravatar.cc/150?img=66",
        },
        text: "This is a test comment on another post by another user who is not the author of the post but the author of the comment on the post, which is a very long sentence. I hope this is long enough to test the UI of the comment section.",
        created_at: "2016-01-01 00:00:00",
      },
    ],
  },
  {
    id: "100003",
    author: {
      id: "2000001",
      username: "SeanSheep",
      avatar: "https://i.pravatar.cc/150?img=66",
    },
    img: "https://assets.toptal.io/images?url=https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1129718/retina_500x200_cover-cold-dive-into-react-native-a-beginners-tutorial-922a625efe84a4c2d782343b333b0bdb.png",
    text: "React is a great framework",
    created_at: "2016-01-01 00:00:00",
    comments: [
      {
        id: "3000001",
        author: {
          id: "2000002",
          username: "JohnDoe",
          avatar: "https://i.pravatar.cc/150?img=19",
        },
        text: "This is a test comment",
        created_at: "2016-01-01 00:00:00",
      },
      {
        id: "3000002",
        author: {
          id: "2000003",
          username: "JaneDoe",
          avatar: "https://i.pravatar.cc/150?img=66",
        },
        text: "This is another test comment",
        created_at: "2016-01-01 00:00:00",
      },
    ],
  },
  {
    id: "100004",
    author: {
      id: "2000001",
      username: "SeanSheep",
      avatar: "https://i.pravatar.cc/150?img=66",
    },
    img: "https://pic4.zhimg.com/80/v2-9fbe6cca59a3389fdedb50cbaa265db3_720w.webp",
    text: "This is a test post",
    created_at: "2016-01-01 00:00:00",
    comments: [],
  },
];

const sample_users = [
  {
    id: "2000001",
    username: "SeanSheep",
    email: "sample@usc.edu",
    avatar: "https://i.pravatar.cc/150?img=66",
    phost: [],
  },
  {
    id: "2000002",
    username: "SeanDog",
    email: "sample2@usc.edu",
    avatar: "https://i.pravatar.cc/150?img=19",
    phost: [],
  },
];

export { sample_phosts, sample_users };
