'use client';

interface Props {
  onClick: () => void;
}

export default function AddButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-2xl shadow-sm transition-colors duration-200"
    >
      <span className="text-xl leading-none">+</span>
      <span>Add Product</span>
    </button>
  );
}
