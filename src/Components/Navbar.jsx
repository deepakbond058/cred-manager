export default function Navbar() {
  return (
    <div className="flex justify-around items-center bg-green-950 text-white py-5">
      <div className="logo cursor-pointer">
        <span className="text-xl font-bold text-green-500">&lt;</span>
        <span className="text-lg">Cred</span>
        <span className="text-xl font-bold text-green-500">Manager/&gt;</span>
      </div>
      <a
        target="_blank"
        className="flex items-center bg-green-900 rounded-full p-1 cursor-pointer hover:ring-1 ring-white "
        href="https://github.com/deepakbond058"
      >
        <img src="/assets/giticon.svg" alt="git" />
        <span>
        View Code
        </span>
      </a>
    </div>
  );
}
