package com.quanlydrl.service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quanlydrl.dto.CheckDanhGiaResponse;
import com.quanlydrl.dto.DanhGia;
import com.quanlydrl.dto.DanhGiaResponse;
import com.quanlydrl.dto.DiemXepLoaiResponse;
import com.quanlydrl.dto.GetDanhGiaRequest;
import com.quanlydrl.dto.TrangThai;
import com.quanlydrl.entity.ChiTietPhieuDanhGia;
import com.quanlydrl.entity.PhieuDanhGia;
import com.quanlydrl.entity.TrangThaiLop;
import com.quanlydrl.repository.ChiTietPhieuDanhGiaRepository;
import com.quanlydrl.repository.PhieuDanhGiaRepository;
import com.quanlydrl.repository.TrangThaiLopRespository;



@Service
public class DanhGiaService {
	
	@Autowired(required = false)
	private PhieuDanhGiaRepository danhgiaRes;
	
	@Autowired(required = false)
	private ChiTietPhieuDanhGiaRepository chiTietDanhGiaRes;
	
	@Autowired(required = false)
	private TrangThaiLopRespository trangThaiLopRes;
	
	/**
	 * Tạo phiếu đánh giá
	 * @param danhGiaRequest
	 * @throws Exception
	 */
	public void createEvaluate( DanhGia danhGiaRequest)  throws Exception{
		
		SimpleDateFormat ff = new SimpleDateFormat("dd/MM/yyyy");
		//tạo phiếu đánh giá
		String maPhieuDanhGia = danhGiaRequest.maSinhVien + danhGiaRequest.maLop+ danhGiaRequest.maHocKi
								+ danhGiaRequest.maNamHoc;
		PhieuDanhGia phieuDanhGia = new PhieuDanhGia(maPhieuDanhGia, danhGiaRequest.maLop, 
				danhGiaRequest.maSinhVien, danhGiaRequest.hoVaTen, ff.parse(danhGiaRequest.ngaySinh), danhGiaRequest.maHocKi, 
				danhGiaRequest.maNamHoc, danhGiaRequest.diemTong, 1);
		danhgiaRes.save(phieuDanhGia);
		
		//Thêm vào bảng trangthailop
		String maTrangThai = danhGiaRequest.maLop + danhGiaRequest.maHocKi + danhGiaRequest.maNamHoc;
		trangThaiLopRes.save(new TrangThaiLop(maTrangThai, danhGiaRequest.maLop, danhGiaRequest.maHocKi, danhGiaRequest.maNamHoc, 0));
		
		// thêm chi tiết đánh giá
		for (int i =0 ; i< danhGiaRequest.tieuChi.size() ; i++) {
			int diem = danhGiaRequest.tieuChi.get(i).diem;
			ChiTietPhieuDanhGia chiTietDanhGia = new ChiTietPhieuDanhGia(maPhieuDanhGia + danhGiaRequest.tieuChi.get(i).maTieuChi, 
					danhGiaRequest.tieuChi.get(i).maTieuChi, diem , diem, diem, diem, maPhieuDanhGia);
			chiTietDanhGiaRes.save(chiTietDanhGia);
		}
	}
	/**
	 * Lây phiếu đánh giá của sinh viên
	 * @param danhGiaRequest
	 * @return
	 */
	public DanhGiaResponse getEvaluate( GetDanhGiaRequest danhGiaRequest) {
		// lấy phiếu đánh giá
		String maPhieuDanhGia = danhGiaRequest.maSinhVien+ danhGiaRequest.maLop + danhGiaRequest.maHocKi + danhGiaRequest.maNamHoc;
		PhieuDanhGia phieuDanhGia = danhgiaRes.getById(maPhieuDanhGia);
		DanhGiaResponse danhGia = null;
		if(phieuDanhGia != null) {
			//lấy chi tiết phiếu đánh gia
			List<ChiTietPhieuDanhGia> chitietDanhGia =  chiTietDanhGiaRes.getDetailEvaluate(maPhieuDanhGia);
			danhGia = new DanhGiaResponse();
			danhGia.maSinhVien = phieuDanhGia.getMaSinhVien();
			danhGia.maLop = phieuDanhGia.getMaLop();
			danhGia.hoVaTen = phieuDanhGia.getHoVaTen();
			danhGia.maHocKi = phieuDanhGia.getMaHocKi();
			danhGia.maNamHoc = phieuDanhGia.getMaNamHoc();
			danhGia.diemTong = phieuDanhGia.getDiemTong();
			danhGia.ngaySinh = new SimpleDateFormat("dd-MM-yyyy").format(phieuDanhGia.getNgaySinh());
			danhGia.tieuChi = chitietDanhGia;
		}
		return danhGia;
	}
	public CheckDanhGiaResponse checkEvaluate( GetDanhGiaRequest request) {
		
		CheckDanhGiaResponse res = new CheckDanhGiaResponse();
		TrangThai trangThai = null;
		String maPhieuDanhGia = request.maSinhVien+ request.maLop + request.maHocKi + request.maNamHoc;
		PhieuDanhGia phieuDanhGia = danhgiaRes.getById(maPhieuDanhGia);
		
		//kiểm tra xem BCS lớp đã gửi đánh giá chưa
		TrangThaiLop trangThaiLop = trangThaiLopRes.getById( request.maLop + request.maHocKi + request.maNamHoc);
		trangThai = new TrangThai();
		if(trangThaiLop != null) {
			if(trangThaiLop.getTrangThai() != 0) {
				trangThai.ma ="-2";
				trangThai.noiDung="Bạn không thể thực hiện đánh giá";
				res.error = null;
				res.data = trangThai;
				return res;
			}
		}
		if(phieuDanhGia == null) {
			trangThai.ma ="-1";
			trangThai.noiDung="đang chờ bạn đánh giá";
		}else {
		
			trangThai = new TrangThai();
			switch (phieuDanhGia.getTrangThai()) {
			case 0:
				trangThai.ma = "0";
				trangThai.noiDung = "Đang chờ bạn đánh giá";
				break;
			case 1:
				trangThai.ma = "1";
				trangThai.noiDung = "Đang chờ BCS lớp đánh giá";
				break;
			case 2:
				trangThai.ma = "2";
				trangThai.noiDung = "Đang chờ CVHT đánh giá";
				break;
			case 3:
				trangThai.ma = "3";
				trangThai.noiDung = "Đang chờ HDK đánh giá";
				break;
			default:
				break;
			}
		}
		res.data= trangThai ;
		res.error = null;
		System.out.println("danhgia:"+phieuDanhGia);
		return res;
	}
	/**
	 * cập nhật điểm bcs đánh giá
	 * @param danhGiaRequest
	 * @throws Exception
	 */
	public void updateDiemBCS( DanhGia danhGiaRequest)  throws Exception{
		
		SimpleDateFormat ff = new SimpleDateFormat("dd/MM/yyyy");
		//update phiếu đánh giá
		String maPhieuDanhGia = danhGiaRequest.maSinhVien + danhGiaRequest.maLop+ danhGiaRequest.maHocKi
								+ danhGiaRequest.maNamHoc;
		PhieuDanhGia phieuDanhGia = new PhieuDanhGia(maPhieuDanhGia, danhGiaRequest.maLop, 
				danhGiaRequest.maSinhVien, danhGiaRequest.hoVaTen, ff.parse(danhGiaRequest.ngaySinh), danhGiaRequest.maHocKi, 
				danhGiaRequest.maNamHoc, danhGiaRequest.diemTong, 1);
		danhgiaRes.save(phieuDanhGia);
		// thêm chi tiết đánh giá
		for (int i = 0 ; i < danhGiaRequest.tieuChi.size() ; i++) {
			int diem = danhGiaRequest.tieuChi.get(i).diem;
			String maChiTiet = maPhieuDanhGia + danhGiaRequest.tieuChi.get(i).maTieuChi;
			chiTietDanhGiaRes.updateDiemBCS(maChiTiet, diem);
		}
	}
	/**
	 * Lấy điêm xếp loại sinh viên
	 * @param maPhieuDanhGia
	 * @return
	 */
	public DiemXepLoaiResponse getDiemXepLoai(String maPhieuDanhGia) {
		
		PhieuDanhGia phieuDanhGia = danhgiaRes.getById(maPhieuDanhGia);
		DiemXepLoaiResponse res = new DiemXepLoaiResponse();;
		System.out.println("phiếu:"+phieuDanhGia);
		if(phieuDanhGia != null && phieuDanhGia.getTrangThai() != 0 && phieuDanhGia.getTrangThai() != -1) {
			int diemTong = phieuDanhGia.getDiemTong();
			res.diemTong = phieuDanhGia.getDiemTong();
			res.xepLoai = ( diemTong>= 90 && diemTong <=100)?"Xuất sắc":( diemTong >=  80 && diemTong <90 )?"Tốt":
				( diemTong >= 65 && diemTong <80 )?"Khá":( diemTong >= 50 && diemTong <65 )?"Trung bình":
				( diemTong >=  35 && diemTong <50 )?"Yếu":( diemTong <35)?"kém":"";
			res.trangThai = phieuDanhGia.getTrangThai();
		}else {
			res.diemTong =0;
			res.xepLoai = "Kém";
			res.trangThai = -1;
		}
		return res;
	}
	/**
	 * Ban cán sự trả đánh giá cho sinh viên
	 * @param danhGia
	 */
	public void  returnEvaluateBCS(List<String> danhGia) {
		String maPhieuDanhGia = null;
		if(danhGia !=null && danhGia.size()>0) {
			for(int i=0 ;i< danhGia.size(); i++) {
				maPhieuDanhGia = danhGia.get(i);
				// những sinh viên chưa đánh giá ko trả về được
				if( danhgiaRes.getById(maPhieuDanhGia) != null) {
					danhgiaRes.updateStatus(0 , maPhieuDanhGia);
				}
			}
		}
	}
	/**
	 * BCS gửi đánh giá
	 * điều kiện những phiếu đánh giá phải được sinh viên đánh giá 
	 * @param listEvaluate
	 */
	public void sendEvaluateByBCS(List<String> listEvaluate, String maTrangThaiLop) {
		// xet trạng thái đánh giá
		for(int i =0 ;i <listEvaluate.size(); i++) {
			danhgiaRes.sendEvaluateByBCS(2, listEvaluate.get(i));
		}	
		// xét trạng thái trangthailop
		trangThaiLopRes.updateStatus(maTrangThaiLop, 1);
	}
	/**
	 * CVHT trả đánh giá cho sinh viên theo lớp ,học kì, năm học
	 * @param danhGia
	 */
	public void  returnEvaluateCVHT( String maLop,String maHK, String maNH) {
		
		danhgiaRes.returnEvaluateByCVHT(maLop, maHK, maNH, 3);
		// xét trạng thái trangthailop
		trangThaiLopRes.updateStatus( maLop+ maHK + maNH, 0);
	}
}
