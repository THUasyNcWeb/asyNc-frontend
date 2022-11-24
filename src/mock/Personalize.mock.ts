import Mock from "better-mock";

Mock.setup({ timeout: "200-400" });

Mock.mock(/personalize/, "get", () => {
  const data = [];
  console.log("测试");
  for (let x = 0; x < 200; x++) {
    data.push({
      title: "3.2的纳西妲我必定拿下",
      picture_url: "https://www.desmos.com/assets/img/homepage-student.png",
      url: "https://www.bilibili.com/video/BV1GJ411x7h7",
      media: "mihoyo",
      pub_time: "2022-11-02",
      is_favorite: true,
      is_readlater: true,
    });
  }
  return {
    data,
  };
});
