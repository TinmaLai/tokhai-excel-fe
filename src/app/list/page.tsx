'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'
import { X, HelpCircle, Settings } from 'lucide-react'
import useFetch from '@/hooks/useFetch'
import Cookies from "js-cookie";
import { useRouter, usePathname } from 'next/navigation'
import { useCallback } from "react";
import {FormMode} from '@/enums/FormMode';
import ExcelForm from "@/components/excelForm/ExcelForm";
import useSignalR from '@/hooks/useSignalR';
import AvatarStack from "@/components/avatar/avatar-stack";
import Handsontable from 'handsontable';
import { Box, SvgIcon, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { createRoot } from "react-dom/client";

interface FilterGroup {
  id: number
  operator: 'AND' | 'OR'
  searchField: string
  searchType: string
  compareType: string
  valueFrom: string
  valueTo: string
  searchValue: string
}

interface User {
  id: number
  name: string
  avatar: string
}

// interface UserForm {
//   key: string
//   value: User[]
// }
export default function DocumentSearch() {
  const [list, setList] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [searchType, setSearchType] = useState('all');
  const [modeDetail, setModeDetail] = useState();
  const [formUsers, setFormUsers] = useState<User[]>([]);
  const [sendUserStatus, setSendUserStatus] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const columns = [
    { dataField: "stt", title: "STT", width: "150px", dataType: "number" },
    { dataField: "so_to_khai", title: "Số tờ khai", width: "150px", dataType: "string" },
    { dataField: "ngay_dang_ky", title: "Ngày đăng ký", width: "150px", dataType: "date" },
    { dataField: "ma_hq", title: "Mã HQ", width: "150px", dataType: "string" },
    { dataField: "ma_lh", title: "Mã LH", width: "150px", dataType: "string" },
    { dataField: "ten_doi_tac", title: "Tên đối tác", width: "150px", dataType: "string" },
    { dataField: "ma_dai_ly_hq", title: "Mã đại lý HQ", width: "150px", dataType: "string" },
    { dataField: "phan_loai_ca_nhan_to_chuc", title: "Phân loại cá nhân tổ chức", width: "150px", dataType: "string" },
    { dataField: "ma_bo_phan_xu_ly_tk", title: "Mã bộ phận xử lý tk", width: "150px", dataType: "string" },
    { dataField: "ma_hieu_phuong_thuc_van_chuyen", title: "Mã hiệu phương thức vận chuyển", width: "150px", dataType: "string" },
    { dataField: "van_don", title: "Vận đơn", width: "150px", dataType: "string" },
    { dataField: "so_luong_kien", title: "Số lượng kiện", width: "150px", dataType: "number" },
    { dataField: "tong_trong_luong_hang_gross", title: "Tổng trọng lượng hàng (Gross)", width: "150px", dataType: "number" },
    { dataField: "ma_dia_diem_luu_kho", title: "Mã địa điểm lưu kho", width: "150px", dataType: "string" },
    { dataField: "ten_dia_diem_luu_kho", title: "Tên địa điểm lưu kho", width: "150px", dataType: "string" },
    { dataField: "ma_phuong_tien_van_chuyen", title: "Mã phương tiện vận chuyển", width: "150px", dataType: "string" },
    { dataField: "ten_phuong_tien_van_chuyen", title: "Tên phương tiện vận chuyển", width: "150px", dataType: "string" },
    { dataField: "ngay_den", title: "Ngày đến", width: "150px", dataType: "date" },
    { dataField: "ma_dia_diem_xep_hang", title: "Mã địa điểm xếp hàng", width: "150px", dataType: "string" },
    { dataField: "ten_dia_diem_xep_hang", title: "Tên địa điểm xếp hàng", width: "150px", dataType: "string" },
    { dataField: "ma_dia_diem_do_hang", title: "Mã địa điểm dỡ hàng", width: "150px", dataType: "string" },
    { dataField: "ten_dia_diem_do_hang", title: "Tên địa điểm dỡ hàng", width: "150px", dataType: "string" },
    { dataField: "so_luong_cont", title: "Số lượng cont", width: "150px", dataType: "number" },
    { dataField: "so_giay_phep", title: "Số giấy phép", width: "150px", dataType: "string" },
    { dataField: "so_hd_tm", title: "Số HĐTM", width: "150px", dataType: "string" },
    { dataField: "ngay_hd_tm", title: "Ngày HĐTM", width: "150px", dataType: "date" },
    { dataField: "tong_tri_gia_hd", title: "Tổng trị giá HĐ", width: "150px", dataType: "number" },
    { dataField: "phuong_thuc_thanh_toan", title: "Phương thức thanh toán", width: "150px", dataType: "string" },
    { dataField: "dieu_kien_gia_hoa_don", title: "Điều kiện giá hóa đơn", width: "150px", dataType: "string" },
    { dataField: "ngoai_te_hoa_don", title: "Ng.Tệ hóa đơn", width: "150px", dataType: "string" },
    { dataField: "ty_gia_vnd", title: "Tỷ giá VNĐ", width: "150px", dataType: "number" },
    { dataField: "phi_bh", title: "Phí BH", width: "150px", dataType: "number" },
    { dataField: "phi_vc", title: "Phí VC", width: "150px", dataType: "number" },
    { dataField: "nguoi_nop_thue", title: "Người nộp thuế", width: "150px", dataType: "string" },
    { dataField: "tri_gia_kb", title: "Trị giá KB", width: "150px", dataType: "number" },
    { dataField: "tong_tri_gia_tt", title: "Tổng trị giá TT", width: "150px", dataType: "number" },
    { dataField: "tong_tien_thue", title: "Tổng tiền thuế", width: "150px", dataType: "number" },
    { dataField: "ma_ly_do_de_nghi_bp", title: "Mã lý do đề nghị BP", width: "150px", dataType: "string" },
    { dataField: "ma_ngan_hang_tra_thue", title: "Mã ngân hàng trả thuế", width: "150px", dataType: "string" },
    { dataField: "nam_phat_hanh_han_muc", title: "Năm phát hành hạn mức", width: "150px", dataType: "number" },
    { dataField: "ky_hieu_ct_han_muc", title: "Ký hiệu CT hạn mức", width: "150px", dataType: "string" },
    { dataField: "so_ct_han_muc", title: "Số CT hạn mức", width: "150px", dataType: "string" },
    { dataField: "ma_xac_dinh_thoi_han_nop_thue", title: "Mã xác định thời hạn nộp thuế", width: "150px", dataType: "string" },
    { dataField: "ma_ngan_hang_bao_lanh", title: "Mã ngân hàng bảo lãnh", width: "150px", dataType: "string" },
    { dataField: "nam_phat_hanh_bao_lanh", title: "Năm phát hành bảo lãnh", width: "150px", dataType: "number" },
    { dataField: "ky_hieu_ct_bao_lanh", title: "Ký hiệu CT bảo lãnh", width: "150px", dataType: "string" },
    { dataField: "so_hieu_ct_bao_lanh", title: "Số hiệu CT bảo lãnh", width: "150px", dataType: "string" },
    { dataField: "so_hd", title: "Số HĐ", width: "150px", dataType: "string" },
    { dataField: "ngay_hd", title: "Ngày HĐ", width: "150px", dataType: "date" },
    { dataField: "ngay_hh_hd", title: "Ngày HHHĐ", width: "150px", dataType: "date" },
    { dataField: "trang_thai", title: "Trạng thái", width: "150px", dataType: "string" },
    { dataField: "phan_luong", title: "Phân luồng", width: "150px", dataType: "string" },
    { dataField: "loai_to_khai_nhap_xuat", title: "Loại tờ khai nhập xuất", width: "150px", dataType: "string" },
    { dataField: "ten_don_vi_xuat_nhap_khau", title: "Tên đơn vị xuất/nhập khẩu", width: "150px", dataType: "string" },
    { dataField: "loai_hinh_to_khai", title: "Loại hình tờ khai", width: "150px", dataType: "string" },
    { dataField: "dia_chi_dn_xuat_nhap_khau", title: "Địa chỉ doanh nghiệp xuất/nhập khẩu", width: "150px", dataType: "string" },
    { dataField: "ma_nuoc_xuat_khau", title: "Mã nước xuất khẩu", width: "150px", dataType: "string" },
    { dataField: "loai_kien", title: "Loại kiện", width: "150px", dataType: "string" },
    { dataField: "don_vi_tinh_trong_luong", title: "Đơn vị tính trọng lượng", width: "150px", dataType: "string" },
    { dataField: "hoa_don_thuong_mai", title: "Hóa đơn thương mại", width: "150px", dataType: "string" },
    { dataField: "ma_phan_loai_hoa_don", title: "Mã phân loại hóa đơn", width: "150px", dataType: "string" },
    { dataField: "ma_phan_loai_phi_van_chuyen", title: "Mã phân loại phí vận chuyển", width: "150px", dataType: "string" },
    { dataField: "ma_phan_loai_phi_bao_hiem", title: "Mã phân loại phí bảo hiểm", width: "150px", dataType: "string" },
    { dataField: "ma_tien_phi_van_chuyen", title: "Mã tiền phí vận chuyển", width: "150px", dataType: "string" },
    { dataField: "ma_tien_phi_bao_hiem", title: "Mã tiền phí bảo hiểm", width: "150px", dataType: "string" },
    { dataField: "dia_chi_nguoi_xuat_nhap_khau_1", title: "Địa chỉ người xuất/nhập khẩu1", width: "150px", dataType: "string" },
    { dataField: "ghi_chu", title: "Ghi chú", width: "150px", dataType: "string" },
    { dataField: "ma_phan_loai_hinh_thuc_hoa_don", title: "Mã phân loại hình thức hóa đơn", width: "150px", dataType: "string" },
    { dataField: "dia_diem_dich_cho_van_chuyen_bao_thue", title: "Địa điểm đích cho vận chuyển báo thuế", width: "150px", dataType: "string" },
    { dataField: "ngay_du_kien_den_dia_diem_dich", title: "Ngày dự kiến đến địa điểm đích", width: "150px", dataType: "date" },
    { dataField: "ngay_khoi_hanh_van_chuyen", title: "Ngày khởi hành vận chuyển", width: "150px", dataType: "date" },
    { dataField: "ma_phan_loai_to_khai_tri_gia", title: "Mã phân loại tờ khai trị giá", width: "150px", dataType: "string" },
    { dataField: "dia_chi_nguoi_xuat_nhap_khau_2", title: "Địa chỉ người xuất/nhập khẩu2", width: "150px", dataType: "string" },
    { dataField: "dia_chi_nguoi_xuat_nhap_khau_3", title: "Địa chỉ người xuất/nhập khẩu3", width: "150px", dataType: "string" },
    { dataField: "dia_chi_nguoi_xuat_nhap_khau_4", title: "Địa chỉ người xuất/nhập khẩu4", width: "150px", dataType: "string" },
    { dataField: "ma_dong_tien_tri_gia_tinh_thue", title: "Mã đồng tiền trị giá tính thuế", width: "150px", dataType: "string" },
    { dataField: "", title: "", width: "100px", dataType: "string" },
    { data: "action", dataField: "", title: "Chức năng", type: 'Action', renderer: actionRenderer, width: "100px", dataType: "string" },
  ];
  const [filterGroups, setFilterGroups] = useState<FilterGroup[]>([
    {
      id: 1,
      operator: 'AND',
      searchField: columns[0].dataField,
      searchType: 'string',
      compareType: 'equal',
      valueFrom: '01/01/2024',
      valueTo: '31/12/2024',
      searchValue: ''
    }
  ]);
  const addFilterGroup = () => {
    setFilterGroups([
      ...filterGroups,
      {
        id: filterGroups.length + 1,
        operator: 'AND',
        searchField: '',
        searchType: 'string',
        compareType: 'equal',
        valueFrom: '01/01/2024',
        valueTo: '31/12/2024',
        searchValue: ''  
    }
    ])
  };
  const { messages, sendTableExportData, sendUserInForm, connection } = useSignalR(
    "https://localhost:7152/chathub"
  );
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("userName");
  const avatar = localStorage.getItem("avatar");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7152/api/ExportDeclarations/Paging", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
          },
          body: JSON.stringify({
            "filters": "[]",
            "take": 1,
            "limit": 10
          }),
        });
        const result = await response.json();
        setList(result.Data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };

    fetchData();
    setCurrentDate(new Date().toLocaleDateString());
  }, []); // [] để chỉ gọi một lần khi component render
  useEffect(() => {
    if (connection) {
      connection.on("ReceiveTableExportData", (user: string, message: string) => {
        try {
          const parsedData = JSON.parse(message);
          setList(parsedData);
        } catch (error) {
          console.error("Invalid JSON:", error);
        }
      });
      connection.on("UpdateUserList", (users: User[]) => {
        
        if(users != undefined){
          setFormUsers(users)
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
        sendUserInForm({ userId, userName, avatar });
        setSendUserStatus(true)
        clearInterval(waitForConnection);
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
  

  const searchExportDeclaration = () => {
    console.log(filterGroups);
    var filterStrings = filterGroups.map(filter => {
      if(searchType == "date" && filter.compareType == "between"){
        return {
          Field: filter.searchField,
          Operator: filter.compareType,
          ValueFrom: filter.valueFrom,
          ValueTo: filter.valueTo
        }
      } else{

      }
      
    })
  }
  function actionRenderer(
    instance: Handsontable,
    td: HTMLElement,
    row: number,
    col: number,
    prop: string | number,
    value: any,
    cellProperties: Handsontable.CellProperties
  ) {
    // Nếu `root` đã tồn tại, tái sử dụng
    if (!td.dataset.reactRoot) {
      const root = createRoot(td); // Tạo React Root mới
      td.dataset.reactRoot = "true"; // Đánh dấu đã khởi tạo root

      root.render(
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            padding: "0 20%",
          }}
        >
          <Tooltip title="Duyệt" arrow>
            <SvgIcon
              component={CheckIcon}
              sx={{ color: "green", fontSize: 20, cursor: "pointer" }}
            />
          </Tooltip>
          <Tooltip title="Xem" arrow>
            <SvgIcon
              component={VisibilityIcon}
              sx={{ fontSize: 20, cursor: "pointer" }}
            />
          </Tooltip>
        </Box>
      );
    }

    return td;
  }

  const save = async () => {
    try {
    var updateRecords = list.filter(x => x.state == FormMode.Update);
    var param = {
      mode: 2,
      records: updateRecords
    }
    const response = await fetch(`https://localhost:7152/api/ExportDeclarations/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Cookies.get("token")}`, // Thêm header Authorization
      },
      body: JSON.stringify(param)
    });
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  }

  if (!list) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h1>Danh sách tờ khai hải quan</h1>
          <div className={styles.actions}>
            <div className="min-h-screen flex items-center justify-center">
              <AvatarStack users={formUsers} maxDisplayed={5} />
            </div>
          </div>
        </div>

        <div className={styles.filterGroups}>
          {filterGroups.map((group, index) => (
            <div key={group.id} className={styles.filterGroup}>
              <div className={styles.filterRow}>
                {index > 0 && (
                  <select
                    value={group.operator}
                    onChange={(e) => {
                      const newGroups = [...filterGroups]
                      newGroups[index].operator = e.target.value as 'AND' | 'OR'
                      setFilterGroups(newGroups)
                    }}
                    className={styles.operatorSelect}
                  >
                    <option value="AND">Và</option>
                    <option value="OR">Hoặc</option>
                  </select>
                )}

                <div className={styles.filterField}>
                  <div>
                    Tìm theo
                  </div>
                  <select
                    value={group.searchType}
                    onChange={(e) => {
                      const newGroups = [...filterGroups];
                      newGroups[index].searchField = e.target.value;
                      newGroups[index].searchType = columns.find(x => x.dataField == e.target.value)?.dataType ?? "";
                      if(e.target.value != "date") newGroups[index].compareType = "equal";
                      else newGroups[index].compareType = "between";

                      setFilterGroups(newGroups)
                    }}
                  >
                    {(columns.filter(x => x.type != "Action").map(col => 
                      <option key={col.dataField} value={col.dataField}>{col.title}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterField}>
                  <select
                    value={group.compareType}
                    onChange={(e) => {
                      const newGroups = [...filterGroups]
                      newGroups[index].compareType = e.target.value
                      setFilterGroups(newGroups)
                    }}
                  >
                    <option value="between">Trong khoảng</option>
                    <option value="equal">Bằng</option>
                    <option value="great">Lớn hơn</option>
                    <option value="less">Bé hơn</option>
                  </select>
                </div>
                {group.compareType == "between" ? (
                  <div className={styles.dateRange}>
                    <div className={styles.dateInput}>
                      <input
                        type="date"
                        value={group.valueFrom}
                        onChange={(e) => {
                          const newGroups = [...filterGroups]
                          newGroups[index].valueFrom = e.target.value
                          setFilterGroups(newGroups)
                        }}
                      />
                    </div>
                    <div className={styles.dateInput}>
                      <input
                        type="date"
                        value={group.valueTo}
                        onChange={(e) => {
                          const newGroups = [...filterGroups]
                          newGroups[index].valueTo = e.target.value
                          setFilterGroups(newGroups)
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.dateInput}>
                      <input
                        value={group.searchValue}
                        onChange={(e) => {
                          const newGroups = [...filterGroups]
                          newGroups[index].searchValue = e.target.value
                          setFilterGroups(newGroups)
                        }}
                      />
                    </div>
                )} 
                
              </div>
            </div>
          ))}
        </div>

        <div className={styles.filterActions}>
          <button className={styles.addCondition} onClick={addFilterGroup}>
            Thêm điều kiện
          </button>
          <button onClick={searchExportDeclaration} className={styles.searchButton}>Tìm kiếm</button>
        </div>
      </div>
      {/* <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
                <th>STT</th>
                <th>Số tờ khai</th>
                <th>Ngày khai báo</th>
                <th>Mã bộ phận xử lý tờ khai</th>
                <th>Trạng thái</th>
                <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {list && list.length > 0 ? (
              list.map((item: ExportDeclaration, index: number) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.declaration_code}</td>
                    <td>{currentDate}</td>
                    <td>--</td>
                    <td>{item.declaration_status === 1 ? "Đã duyệt" : "Chờ xử lý"}</td>
                    <td>
                      <button className={styles.actionButton} onClick={(e) => {
                        e.stopPropagation();  // Ngăn sự kiện lan truyền
                        showDetail(item.declaration_id, FormMode.View);
                      }}>Xem
                      </button>
                      <button className={styles.actionButton} onClick={(e) => {
                        e.stopPropagation();  // Ngăn sự kiện lan truyền
                        showDetail(item.declaration_id, FormMode.Update);
                      }}>Sửa
                      </button>
                    </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className={styles.emptyState}>
                  <img alt="No data" width={100} height={100}/>
                  <p>Không có dữ liệu</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div> */}
      <div>
        <ExcelForm
          tableData={list} 
          blurCell={blurCell}
          columns={columns}
        />
      </div>
      <div>
        <button onClick={save}>Cất</button>
      </div>
    </div>
  )
}

