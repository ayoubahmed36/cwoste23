// fill-registration-form.ts

// --- utils ---
const abs = (path: string) => new URL(path, window.location.origin).toString();

async function fetchAsFile(path: string, name: string, type?: string): Promise<File> {
	const res = await fetch(abs(path));
	if (!res.ok) throw new Error(`Failed to fetch ${path}`);
	const blob = await res.blob();
	return new File([blob], name, { type: type || blob.type });
}

function setInputFiles(input: HTMLInputElement, files: File[]) {
	const dt = new DataTransfer();
	files.forEach(f => dt.items.add(f));
	input.files = dt.files;
	input.dispatchEvent(new Event("input", { bubbles: true }));
	input.dispatchEvent(new Event("change", { bubbles: true }));
}

function pick<T>(arr: T[]) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// --- static assets you said you'll place in /public/temp-files ---
const PDF_1 = { path: "/temp-files/Notification-Defavorable.pdf", name: "Notification-Defavorable.pdf", type: "application/pdf" };
const PDF_2 = { path: "/temp-files/declaration.pdf", name: "declaration.pdf", type: "application/pdf" };
const IMAGES = ["/temp-files/house.png", "/temp-files/sales.png", "/temp-files/car.png", "/temp-files/cwoste.png"];

// your fake users (example)
const fakeUsers = [
	{
		ccp: "123456",
		email: "ahmed@example.com",
		password: "password123",
		password_confirmation: "password123",
		firstName: "أحمد",
		lastName: "أيوب",
		phone: "0555123456",
		dateOfBirth: new Date(1990, 1, 1),
		gender: "ذكر",
		maritalStatus: "أعزب",
		nbChildren: 0,
		jobStatus: "موظف",
		jobTitle: "مهندس",
		workInstitution: "ثانوية معايزية الطاهر",
	},
	{
		ccp: "654321",
		email: "fatima@example.com",
		password: "password123",
		password_confirmation: "password123",
		firstName: "فاطمة",
		lastName: "محمد",
		phone: "0666987654",
		dateOfBirth: new Date(1985, 4, 15),
		gender: "انثى",
		maritalStatus: "متزوج",
		nbChildren: 2,
		jobStatus: "متقاعد",
		jobTitle: "أستاذ",
		workInstitution: "ثانوية ابن خلدون",
	},
];

function getRandomUser() {
	return pick(fakeUsers);
}

export default function fillRegistrationForm(setData: (key: string, value: any) => void) {
	const container = document.createElement("div");
	container.style.position = "fixed";
	container.style.top = "10px";
	container.style.left = "10px";
	container.style.zIndex = "9999";
	container.style.display = "flex";
	container.style.gap = "8px";

	const fillBtn = document.createElement("button");
	fillBtn.type = "button";
	fillBtn.innerText = "ملء النموذج";
	fillBtn.style.background = "orange";
	fillBtn.style.color = "white";
	fillBtn.style.padding = "6px 12px";
	fillBtn.style.borderRadius = "4px";
	fillBtn.style.cursor = "pointer";

	fillBtn.onclick = async () => {
		const user = getRandomUser();

		// 1) fill normal fields + sync DatePicker via window.__setSelectedDate
		Object.entries(user).forEach(([k, v]) => {
			setData(k, v);
		});

		// 2) fetch real PDFs & a random image
		const [pdf1, pdf2, imgFile] = await Promise.all([
			fetchAsFile(PDF_1.path, PDF_1.name, PDF_1.type),
			fetchAsFile(PDF_2.path, PDF_2.name, PDF_2.type),
			(async () => {
				const imgPath = pick(IMAGES);
				const f = await fetchAsFile(imgPath, imgPath.split("/").pop() || "profile.png");
				return f;
			})(),
		]);

		//
		setData("personalImage", imgFile);
		const documents = [
			{ id: 1, description: "شهادة عمل أو شهادة الإحالة على التقاعد", file: pdf1 },
			{ id: 2, description: "صك بريدي", file: pdf2 },
		];
		setData("documents", documents);
		

		// const pdfInputs = Array.from(document.querySelectorAll<HTMLInputElement>('input[type="file"][accept*="pdf"]'));
		// if (pdfInputs[0]) setInputFiles(pdfInputs[0], [pdf1]);
		// if (pdfInputs[1]) setInputFiles(pdfInputs[1], [pdf2]);
		// setData("files", [pdf1, pdf2]);

		// const imgInput =
		// 	document.querySelector<HTMLInputElement>('input[type="file"][accept^="image/"]') ||
		// 	document.querySelector<HTMLInputElement>('input[type="file"][accept*="image"]');
		// if (imgInput) {
		// 	setInputFiles(imgInput, [imgFile]);
		// }

		// setData("personalImage", imgFile);

		const terms = document.querySelector<HTMLInputElement>("#terms");
		if (terms && !terms.checked) terms.click();
	};

	const resetBtn = document.createElement("button");
	resetBtn.innerText = "إعادة تعيين";
	resetBtn.style.background = "gray";
	resetBtn.style.color = "white";
	resetBtn.style.padding = "6px 12px";
	resetBtn.style.borderRadius = "4px";
	resetBtn.style.cursor = "pointer";
	resetBtn.onclick = () => window.location.reload();

	container.appendChild(fillBtn);
	container.appendChild(resetBtn);
	document.body.appendChild(container);
}
