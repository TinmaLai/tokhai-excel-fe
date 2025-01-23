"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CustomForm() {
  return (
    <Card className="p-6 w-full max-w-3xl mx-auto bg-gray-50">
      {/* Nhóm loại hình */}
      <div className="mb-4">
        <Label className="font-medium">Nhóm loại hình:</Label>
        <RadioGroup defaultValue="business" className="flex gap-4 mt-1" disabled>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Kinh doanh, đầu tư</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="export" id="export" />
            <Label htmlFor="export">Sản xuất xuất khẩu</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="family" id="family" />
            <Label htmlFor="family">Gia công</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="production" id="production" />
            <Label htmlFor="production">Chế xuất</Label>
          </div>
        </RadioGroup>
      </div>

      {/* First row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label>Số tờ khai:</Label>
          <Input disabled />
        </div>
        <div>
          <Label>STT:</Label>
          <Input disabled />
        </div>
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label>Số tờ khai đầu tiên:</Label>
            <Input disabled />
          </div>
          <div className="w-16">
            <Label>Số nhánh:</Label>
            <Input disabled />
          </div>
        </div>
        <div>
          <Label>Số tờ khai tạm nhập tái xuất tương ứng:</Label>
          <Input disabled />
        </div>
      </div>

      {/* Third row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="flex items-center">
            Mã loại hình: <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="flex gap-2">
            <Input disabled value="02K2" className="flex-1" />
            <Input disabled value="CC HQ CK Cảng Sài Gòn khu vực IV (IC)" className="flex-2" />
          </div>
        </div>
        <div>
          <Label>Mã phân loại hàng hóa:</Label>
          <Input disabled />
        </div>
      </div>

      {/* Fourth row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label>Cơ quan Hải quan:</Label>
          <Input disabled />
        </div>
        <div>
          <Label>Mã bộ phận xử lý tờ khai:</Label>
          <Input disabled />
        </div>
      </div>

      {/* Fifth row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <Label>Ngày đăng ký tờ khai:</Label>
          <Input disabled />
        </div>
        <div>
          <Label>Mã địa điểm lưu kho hàng chờ thông quan:</Label>
          <Input disabled />
        </div>
      </div>

      {/* Sixth row */}
      <div className="mb-4">
        <Label>Ngày khai báo (dự kiến):</Label>
        <Input disabled />
      </div>

      {/* Đơn vị xuất nhập khẩu section */}
      <div className="mt-6">
        <h2 className="font-medium mb-4 border-b pb-2">Đơn vị xuất nhập khẩu</h2>

        {/* Người xuất khẩu */}
        <div className="mb-6">
          <Label>Người xuất khẩu</Label>
          <div className="ml-4 space-y-3">
            <div>
              <Label>Mã:</Label>
              <Input disabled value="0106522165" />
            </div>
            <div>
              <Label>Tên:</Label>
              <Input disabled value="CÔNG TY CỔ PHẦN PC CHUONG" />
            </div>
            <div>
              <Label>Mã bưu chính:</Label>
              <Input disabled value="100000" />
            </div>
            <div>
              <Label>Địa chỉ:</Label>
              <Input disabled value="Số nhà 11, ngách 3, ngõ 26, đối 3, Xã Tả Thanh Oai, Huyện Thanh Trì, Hà Nội" />
            </div>
            <div>
              <Label>Điện thoại:</Label>
              <Input disabled value="0327095388" />
            </div>
          </div>
        </div>

        {/* Người ủy thác xuất khẩu */}
        <div className="mb-6">
          <Label>Người ủy thác xuất khẩu</Label>
          <div className="ml-4 space-y-3">
            <div>
              <Label>Mã:</Label>
              <Input disabled />
            </div>
            <div>
              <Label>Tên:</Label>
              <Input disabled />
            </div>
          </div>
        </div>

        {/* Người nhập khẩu */}
        <div className="mb-6">
          <Label>Người nhập khẩu</Label>
          <div className="ml-4 space-y-3">
            <div>
              <Label>Mã:</Label>
              <Input disabled />
            </div>
            <div>
              <Label className="flex items-center">
                Tên: <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input disabled />
            </div>
            <div>
              <Label>Mã bưu chính:</Label>
              <Input disabled />
            </div>
          </div>
        </div>

        {/* Address and Country Info */}
        <div className="ml-4 space-y-3">
          <div>
            <Label>
              Địa chỉ: <span className="text-red-500">*</span>
            </Label>
            <Input disabled className="mb-2" />
            <Input disabled />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Mã nước:</Label>
              <Input disabled />
            </div>
            <div className="flex-1">
              <Label>Mã người khai Hải quan:</Label>
              <Input disabled />
            </div>
          </div>
        </div>

        {/* Văn đơn section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Văn đơn</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>Số vận đơn:</Label>
                <Input disabled />
              </div>
              <Input disabled className="w-24" placeholder="Chọn..." />
              <Input disabled className="w-24" placeholder="Đăng ký..." />
              <Input disabled className="w-24" placeholder="In định danh" />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Số lượng kiện:</Label>
                <Input disabled />
              </div>
              <div className="flex-1">
                <Label>Tổng trọng lượng hàng (Gross):</Label>
                <Input disabled />
              </div>
            </div>

            <div>
              <Label>Mã địa điểm lưu kho hàng chờ thông quan dự kiến:</Label>
              <Input disabled />
            </div>

            <div>
              <Label>
                Địa điểm nhận hàng cuối cùng: <span className="text-red-500">*</span>
              </Label>
              <Input disabled />
            </div>

            <div>
              <Label>Địa điểm xếp hàng:</Label>
              <Input disabled />
            </div>

            <div>
              <Label>Phương tiện vận chuyển:</Label>
              <Input disabled />
            </div>

            <div>
              <Label>
                Ngày hàng đi dự kiến: <span className="text-red-500">*</span>
              </Label>
              <Input disabled />
            </div>

            <div>
              <Label>Ký hiệu và số hiệu:</Label>
              <Input disabled />
            </div>
          </div>
        </div>

        {/* Thông tin hợp đồng section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Thông tin hợp đồng</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Số hợp đồng:</Label>
                <Input disabled />
              </div>
              <div className="flex items-center mt-6">
                <a href="#" className="text-blue-600 hover:underline">
                  Khai báo thông tin HĐ theo yêu cầu của Hải quan
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label>Ngày hợp đồng:</Label>
                <Input disabled />
              </div>
              <div className="flex-1">
                <Label>Ngày hết hạn:</Label>
                <Input disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Chứng từ giấy phép section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Chứng từ giấy phép</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Label className="w-8 pt-2">1</Label>
              <Input disabled className="w-24" />
              <Input disabled className="flex-1" />
            </div>
            <div className="flex gap-4">
              <Label className="w-8 pt-2">2</Label>
              <Input disabled className="w-24" />
              <Input disabled className="flex-1" />
              <Label className="w-8 pt-2">3</Label>
              <Input disabled className="w-24" />
              <Input disabled className="flex-1" />
            </div>
            <div className="flex gap-4">
              <Label className="w-8 pt-2">4</Label>
              <Input disabled className="w-24" />
              <Input disabled className="flex-1" />
              <Label className="w-8 pt-2">5</Label>
              <Input disabled className="w-24" />
              <Input disabled className="flex-1" />
            </div>
          </div>
        </div>

        {/* Thông tin hóa đơn section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Thông tin hóa đơn</h2>
          <div className="space-y-4">
            <div>
              <Label>Phân loại hình thức hóa đơn:</Label>
              <Input disabled />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Số tiếp nhận hóa đơn điện tử:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Số hóa đơn:</Label>
                <Input disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Ngày phát hành:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Phương thức thanh toán:</Label>
                <Input disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center">
                  Mã phân loại giá hóa đơn: <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input disabled />
              </div>
              <div>
                <Label className="flex items-center">
                  Điều kiện giá hóa đơn: <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input disabled />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center">
                  Trị giá tính thuế: <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input disabled />
              </div>
              <div>
                <Label>Mã đồng tiền trị giá tính thuế:</Label>
                <Input disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Thuế và bảo lãnh section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Thuế và bảo lãnh</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Phần loại khoản cần quy đổi VNĐ:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Tổng hệ số phân bổ trị giá tính thuế:</Label>
                <Input disabled />
              </div>
            </div>

            <div>
              <Label>Người nộp thuế:</Label>
              <Input disabled />
            </div>

            <div>
              <Label>Mã ngân hàng trả thuế thay:</Label>
              <Input disabled />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Năm phát hành hạn mức:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Ký hiệu chứng từ hạn mức:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Số chứng từ hạn mức:</Label>
                <Input disabled />
              </div>
            </div>

            <div>
              <Label>Mã xác định thời hạn nộp thuế:</Label>
              <Input disabled />
            </div>

            <div>
              <Label>Mã ngân hàng bảo lãnh:</Label>
              <Input disabled />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Năm phát hành bảo lãnh:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Ký hiệu chứng từ bảo lãnh:</Label>
                <Input disabled />
              </div>
              <div>
                <Label>Số chứng từ bảo lãnh:</Label>
                <Input disabled />
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin đính kèm section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Thông tin đính kèm</h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <Label>Số đính kèm khai báo điện tử:</Label>
                <Input disabled />
              </div>
              <div className="flex gap-2 items-center">
                <Label>(1)</Label>
                <Input disabled className="w-32" />
                <Input disabled className="flex-1" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <Label>(2)</Label>
                  <Input disabled className="w-32" />
                  <Input disabled className="flex-1" />
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <Label>(3)</Label>
                  <Input disabled className="w-32" />
                  <Input disabled className="flex-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin vận chuyển section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Thông tin vận chuyển</h2>
          <div className="space-y-4">
            <div>
              <Label>Ngày khởi hành vận chuyển:</Label>
              <Input disabled />
            </div>

            <div>
              <Label>Thông tin trung chuyển:</Label>
              <div className="space-y-3 mt-2">
                <div className="flex gap-4 items-center">
                  <Label className="w-8">(1)</Label>
                  <div className="flex-1">
                    <Label>Mã địa điểm</Label>
                    <Input disabled />
                  </div>
                  <div className="flex items-center gap-2">
                    <Label>Ngày đến</Label>
                    <Input disabled className="w-32" />
                    <span>-</span>
                    <Label>Ngày khởi hành</Label>
                    <Input disabled className="w-32" />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Label className="w-8">(2)</Label>
                  <div className="flex-1">
                    <Input disabled />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input disabled className="w-32" />
                    <span>-</span>
                    <Input disabled className="w-32" />
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <Label className="w-8">(3)</Label>
                  <div className="flex-1">
                    <Input disabled />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input disabled className="w-32" />
                    <span>-</span>
                    <Input disabled className="w-32" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label>Địa điểm đích cho vận chuyển bảo thuế:</Label>
              <div className="flex gap-2">
                <Input disabled className="flex-1" />
                <Input disabled className="w-32" />
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin khác section */}
        <div className="mt-6">
          <h2 className="font-medium mb-4 border-b pb-2">Thông tin khác</h2>
          <div className="space-y-4">
            <div>
              <Label>Phần ghi chú:</Label>
              <textarea
                disabled
                className="w-full h-24 mt-1 px-3 py-2 bg-background border border-input rounded-md opacity-50"
              />
            </div>
            <div>
              <Label>Số quản lý của nội bộ doanh nghiệp:</Label>
              <Input disabled />
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

