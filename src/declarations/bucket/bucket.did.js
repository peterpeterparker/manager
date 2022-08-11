export const idlFactory = ({ IDL }) => {
  const Bucket = IDL.Service({ 'say' : IDL.Func([], [IDL.Text], ['query']) });
  return Bucket;
};
export const init = ({ IDL }) => { return [IDL.Text]; };
