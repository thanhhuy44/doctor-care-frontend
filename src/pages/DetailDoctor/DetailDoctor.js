const Item = () => {
    return (
        <div className="py-2 border-b-[0.5px] border-gray-300">
            <h4 className="text-base mb-1 font-semibold">Trần Duy Thanh</h4>
            <p className="text-sm font-normal text-gray-600">
                {' '}
                Mọi thứ đều rất tốt. Bác sĩ hỏi kỹ càng, chu đáo và nhẹ nhàng
            </p>
        </div>
    );
};

function DetailDoctor() {
    return (
        <div className="container mx-auto py-8">
            <div className="flex items-start">
                <div className="max-w-[200px] aspect-square rounded-full overflow-hidden shadow-md">
                    <img
                        className="block w-full"
                        src="https://cdn.bookingcare.vn/fr/w200/2021/01/18/105401-bsckii-tran-minh-khuyen.jpg"
                        alt="doctor"
                    />
                </div>
                <div className="m-5">
                    <h3 className="mb-3 text-2xl font-semibold">Bác sĩ Chuyên khoa II Trần Minh Khuyên</h3>
                    <p className="text-sm font-normal leading-6">
                        Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh <br /> Tốt nghiệp Tâm lý trị
                        liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris) <br /> Bác sĩ nhận khám từ
                        16 tuổi trở lên
                    </p>
                </div>
            </div>
            <div className="my-10 flex items-start">
                <div className="flex-1">
                    <h5 className="uppercase text-xl text-blue-700 font-semibold">Lịch khám</h5>
                    <select className="p-2 text-base font-semibold border-b border-gray-700 min-w-[200px]">
                        <option>13/08</option>
                        <option>14/08</option>
                        <option>15/08</option>
                        <option>16/08</option>
                    </select>
                </div>
                <div className="pl-5 border-l-[0.5px] border-gray-500">
                    <div>
                        <p className="mb-2 uppercase text-xl font-medium">ĐỊA CHỈ KHÁM</p>
                        <p className="font-semibold text-xl">Phòng khám Bệnh viện Đại học Y Dược 1</p>
                        <p className="text-base">20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</p>
                    </div>
                    <div className="mt-2 flex items-end ">
                        <p className="font-base font-normal"> Giá khám: 250.000 đ</p>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 py-4">
                Bác sĩ Chuyên khoa II Trần Minh Khuyên Nguyên Trưởng khoa lâm sàng, Bệnh tâm thần Thành phố Hồ Chí Minh
                Tốt nghiệp Tâm lý trị liệu, trường Tâm lý Thực hành Paris (Psychology practique de Paris) Bác sĩ nhận
                khám từ 16 tuổi trở lên Quá trình đào tạo Tốt nghiệp Bác sĩ Đa khoa, Trường Đại học y dược thành phố Hồ
                Chí Minh Học chuyên khoa cấp I và chuyên khoa cấp II Chuyên ngành Tâm thần, Đại học Y khoa Huế Tốt
                nghiệp Tâm lý trị liệu, trường Tâm lý thực Hành Paris (Psychology practique de Paris) Quá trình công tác
                Nguyên Trưởng phòng Kế hoạch Nghiệp vụ, Trưởng phòng khám Tâm thần Quận 3, thành phố Hồ Chí Minh Nguyên
                Trưởng khoa lâm sàng Bệnh tâm thần thành phố Hồ Chí Minh Giám định viên tư pháp chuyên ngành Tâm thần
                giám định các trường hợp trọng án, các trường hợp có liên quan pháp lý do cảnh sát điều tra, tòa án các
                cấp trưng cầu. Khám và điều trị Các rối loạn giấc ngủ không thực tổn: mất ngủ, ngủ nhiều, ngủ ngày quá
                mức, rối loạn nhịp thức ngủ, hoảng sợ khi ngủ, ác mộng, ngủ rũ,... Các rối loạn lo âu: lo lắng, sợ hãi
                về tương lai, cảm giác cáu gắt, căng thẳng, vận động, bồn chồn, hồi hộp, vã mồ hôi tay chân, cồn cào,...
                Rối loạn trầm cảm: buồn chán, bi quan, mệt mỏi, giảm hoạt động,... Hưng cảm: vui vẻ quá mức, suồng sã,
                tăng hoạt động, đứng ngồi không yên,... Rối loạn hoang tưởng: hoang tưởng bị hại, bị theo dõi, liên hệ,
                bị tội,... Rối loạn ảo giác Các rối loạn liên quan đến stress Rối loạn khí sắc Rối loạn cảm xúc phân
                liệt Rối loạn đa nhân cách Các bệnh lý loạn thần do sử dụng chất (ma túy đá, cần sa, heroin..)...
            </div>
            <div className="border-t border-gray-300 py-4">
                <p className="mb-4 text-2xl font-semibold">Phản hồi của bệnh nhân sau khi đi khám</p>
                <div className="">
                    <Item />
                    <Item />
                    <Item />
                    <Item />
                </div>
            </div>
        </div>
    );
}

export default DetailDoctor;
