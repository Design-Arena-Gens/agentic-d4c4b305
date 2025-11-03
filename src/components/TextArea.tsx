import { TextareaHTMLAttributes } from 'react';

export default function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { className, ...rest } = props;
  return (
    <textarea
      className={
        'w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 ' +
        (className ?? '')
      }
      rows={8}
      {...rest}
    />
  );
}
