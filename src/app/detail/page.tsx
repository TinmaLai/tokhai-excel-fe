"use client";
import { useRouter, usePathname  } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import "./style.css"
import LoginForm from "@/components/login/LoginForm";
import ExcelForm from "@/components/excelForm/ExcelForm";
import { useParams } from 'next/navigation';
import {useEffect, useState} from 'react'
import Cookies from "js-cookie";
import AvatarStack from "@/components/avatar/avatar-stack";
import useSignalR from '@/hooks/useSignalR';
import {FormMode} from '@/enums/FormMode';

interface User {
  id: number
  name: string
  avatar: string
}

interface UserForm {
  key: string
  value: User[]
}
export default function Detail() {
    const params = useSearchParams();
    const id = params ? params.get("id") : ''; // Lấy giá trị id từ URL
    const modeDetail = params ? params.get("mode") : '';
    const [detailData, setDetailData] = useState<any[][]>();
    const [formUsers, setFormUsers] = useState<User[]>([]);
    const [sendUserStatus, setSendUserStatus] = useState(false);
    const [mode, setMode] = useState<number>(parseInt(modeDetail ?? "1"));
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    const avatar = localStorage.getItem("avatar");
    const router = useRouter();
    const pathname = usePathname();
    const header = ["Mã loại hình:","Cơ quan Hải quan:","Mã bộ phận xử lý tờ khai:","Mã hiệu phương thức vận chuyển:","Mã:","Tên:","Mã bưu chính:","Địa chỉ:","Điện thoại:","Tên:","Địa chỉ:","Mã nước:","Số vận đơn:","Số lượng kiện:","Loại kiện hàng:","Tổng trọng lượng hàng (Gross)","Đơn vị trọng lượng:","Mã địa điểm lưu kho hàng chờ thông quan dự kiến:","Địa điểm nhận hàng cuối cùng","Địa điểm xếp hàng:","Phương tiện vận chuyển:","Ngày hàng đi dự kiến","Số hợp đồng:","Ngày hợp đồng:","Phân loại hình thức hóa đơn:","Số hóa đơn:","Ngày phát hành","Phương thức thanh toán","Mã phân loại giá hóa đơn","Điều kiện giá hóa đơn","Tổng trị giá hóa đơn","Mã đồng tiền của hóa đơn","Trị giá tính thuế:","Mã đồng tiền trị giá tính thuế:","Phân loại đính kèm","Số đính kèm","Ngày khởi hành vận chuyển","Mã địa điểm (Thông tin trung chuyển)","Ngày đến (Thông tin trung chuyển)","Ngày khởi hành (Thông tin trung chuyển)","Mã địa điểm (Địa điểm đích cho thuê vận chuyển bảo thuế)","Ngày đến (Địa điểm đích cho thuê vận chuyển bảo thuế)","Phần ghi chú"
    ];
    const columns = [
      {
        title: 'Mã loại hình',
        dataField: ''
      }
    ];

    const { messages, sendTableExportData, sendUserInForm, connection } = useSignalR(
      "https://localhost:7152/chathub"
    );
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://localhost:7152/api/ExportDeclarations/${id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
              },
            });
            const result = await response.json();
            var table = [Object.values(result)];
            
            const updatedFirstRow = [
                ...table.slice(0, 1)[0], // Lấy phần tử đầu tiên trong mảng 1 chiều
                ...Array(43 - table[0].length).fill(""), // Thêm cột trống nếu thiếu
            ];
            // Thêm 35 dòng trống sau dòng đầu tiên
            const emptyRows = Array(20).fill(Array(43).fill(""));
            // Nối dữ liệu (dòng đầu tiên + 35 dòng trống)
            const finalData = [updatedFirstRow, ...emptyRows];
            setDetailData(finalData);
          } catch (error) {
            console.error("Lỗi khi fetch dữ liệu:", error);
          }
        };
        fetchData();
    }, []); // [] để chỉ gọi một lần khi component render
    
    
    useEffect(() => {
      if (connection) {
        connection.on("ReceiveTableExportData", (user: string, message: string) => {
          try {
            const parsedData = JSON.parse(message);
            var declaration_id = parsedData[0][0];
            if (id == declaration_id) {
              setDetailData(parsedData);
            }
          } catch (error) {
            console.error("Invalid JSON:", error);
          }
        });
        connection.on("UpdateUserList", (users: UserForm[]) => {
          
          var usersForm = users.find(item => item?.key == id)?.value;
          if(usersForm != undefined){
            setFormUsers(usersForm)
          }
        });
        
        return () => {
          connection.off("ReceiveTableExportData");
          connection.off("UpdateUserList");
          // if (typeof id === "string") {
          //   removeUserInForm(id, {
          //     userId: userId,
          //     userName: userName,
          //     avatar: avatar,
          //   });
          // }
        };
      }
      
    }, [connection]); 
    useEffect(() => {
      return () => {
        console.log("Route changed, closing WebSocket...");
        if (connection) connection.stop();
      };
    }, [pathname]); // Khi pathname thay đổi thì dừng connection
    if (sendUserStatus == false){
      const waitForConnection = setInterval(() => {
        if (connection && connection.state === "Connected") {
          console.log("WebSocket is fully connected, sending user info...");
          if(typeof(id) === 'string'){
            sendUserInForm(id, { userId, userName, avatar });
            setSendUserStatus(true)
            clearInterval(waitForConnection);
          }
        }
      }, 100);
      if(sendUserStatus){
        clearInterval(waitForConnection);
      }
    }
    
    // Hàm xử lý sự kiện từ component con
    const blurCell = (msg: string) => {
      sendTableExportData(userId ?? "", msg);
    };
    const close = () => {
      router?.back();
    }
    const saveForm = async (mode: number) => {
      try {
        if(mode == FormMode.Update){
          var param = {
            mode: mode,
            record: detailData
          }
          const response = await fetch(`https://localhost:7152/api/ExportDeclarations/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
            },
            body: JSON.stringify(param)
          });
          if(response.status == 200){
            setMode(FormMode.View);
          }
        }
        else if(mode == FormMode.View){
          setMode(FormMode.Update);
        }
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    }
    if (!detailData) return <div>Loading...</div>;

    return (
        <div>
        <div className="form-header">
          <h1>Nhập tờ khai hải quan</h1>
          <div className="min-h-screen flex items-center justify-center">
            <AvatarStack users={formUsers} maxDisplayed={5} />
          </div>
        </div>
        <ExcelForm
        tableData={detailData} 
        blurCell={blurCell}
        columns={columns}
        />
        <div className="button-container">
            <div className="button button-store" onClick={close}>Đóng</div>
            <div className="button button-save" onClick={() => saveForm(mode)}>{mode == FormMode.View ? "Sửa" : "Cất"}</div>
        </div>
        </div>
    );
}
