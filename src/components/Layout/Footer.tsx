export default function Footer() {
	return (
		<div className="absolute mt-0 flex flex-wrap items-center md:justify-between justify-center w-full bottom-0 z-10 h-10">
			<div className="w-full md:w-4/12 px-4 mx-auto text-center">
				<div className="text-sm text-gray-600 font-semibold py-1">
					Copyright © {new Date().getFullYear()}{" "}by{" "}
					<a
						href="https://github.com/jrsmarcilio/uSecret.git"
						className="text-gray-600 hover:text-gray-900"
					>
						uSecret
					</a>.
				</div>
			</div>
		</div>
	);
};