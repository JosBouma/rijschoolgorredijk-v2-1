export default defineCachedEventHandler(
  async (evt) => {
    const uid = getRouterParam(evt, 'uid');
    const data = await allContent();
    const item = data?.find(item => item.uid === uid);
    if(item) {
      return item;
    }
    return null;
  },
  {
    maxAge: 60 * 60
  }
);