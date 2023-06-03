export const createMessageTemplate = ({
  content = '',
  url,
  unRead,
}: {
  content?: string;
  url?: string;
  unRead: boolean;
}) => ({
  _id: `temp_${Date.now()}_${Math.random()}`,
  text: content,
  image: url,
  createdAt: Date.now(),
  unRead: unRead,
  user: {
    _id: 'assistant',
  },
});
