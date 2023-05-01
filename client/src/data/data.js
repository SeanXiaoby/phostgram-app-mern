const sample_phosts = [
  {
    id: "100001",
    author: {
      id: "2000001",
      username: "SeanSheep",
      avatar: "https://i.pravatar.cc/150?img=66",
    },
    img: "https://pic4.zhimg.com/80/v2-0124b4257f6b8c303ba3f87d89f92073_720w.webp",
    text: "This is a test post and this is a very good post. This is about the actor of Professor Snape who is a one of my favourite character in the whole series of HP",
    created_at: "2016-01-01 00:00:00",
    comments: [
      {
        id: "3000001",
        author: {
          id: "2000002",
          username: "JohnDoe",
          avatar: "https://i.pravatar.cc/150?img=66",
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
    id: "100002",
    author: {
      id: "2000002",
      username: "JohnDoe",
      avatar: "https://i.pravatar.cc/150?img=19",
    },
    img: "https://pic4.zhimg.com/80/v2-9fbe6cca59a3389fdedb50cbaa265db3_720w.webp",
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
        text: "This is a test comment",
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
    img: "https://pic4.zhimg.com/80/v2-0124b4257f6b8c303ba3f87d89f92073_720w.webp",
    text: "This is a test post",
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
