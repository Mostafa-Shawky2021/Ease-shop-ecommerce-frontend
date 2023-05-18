import Link from "next/link";
import Image from "next/image";

import NotfoundImage from "@assets/images/notfound/notfound.png";
import { BreadCrumbLayout } from "@root/components/layout";

import style from "@root/sass/_notfound.module.scss";
export default function NotFoundPage() {
	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: "404", active: true },
	];
	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<div className={style.notfoundPageWrapper}>
				<div className={style.imageNotFoundWrapper}>
					<Image src={NotfoundImage} className="img-fluid" />
				</div>
				<div className={style.notFoundContent}>
					<h5 className={style.title}>الصفحة غير موجودة</h5>
					<p className={style.description}>نأسف الصفحة التي تبحث عنها غير موجودة او تم نقلها</p>
					<div className={style.action}>
						<Link href="/" className="btn btn-primary btn-sm">
							العودة الي الصفحة الرئيسية
						</Link>
						<Link href="/contact" className="btn btn-primary btn-sm">
							التواصل معنا
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
