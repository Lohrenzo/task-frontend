interface Props {
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Nav({ setOpenAdd }: Props) {
  return (
    <>
      <div className="text-center">
        <a href="/" className="text-xl font-bold mb-6">
          Task List
        </a>
      </div>
      <div className="absolute top-2 right-5 p-2">
        <button
          onClick={() => setOpenAdd(true)}
          className="px-3 py-1 hover:underline rounded transition"
        >
          Add Task
        </button>
      </div>
    </>
  );
}
