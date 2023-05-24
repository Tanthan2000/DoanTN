package com.quanlydrl.controller;


import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.quanlydrl.dto.CheckDanhGiaResponse;
import com.quanlydrl.dto.DanhGia;
import com.quanlydrl.dto.DanhGiaResponse;
import com.quanlydrl.dto.DiemXepLoaiResponse;
import com.quanlydrl.dto.GetDanhGiaRequest;
import com.quanlydrl.entity.PhieuDanhGia;
import com.quanlydrl.service.DanhGiaService;



@RestController
public class DanhGiaController {

	@Autowired(required = true)
	private DanhGiaService danhgiaService;
	
	
	@RequestMapping("/createEvaluate")
	public String createEvaluate( @RequestBody DanhGia danhGiaRes) {
		try {
			danhgiaService.createEvaluate(danhGiaRes);
			return "Lưu phiếu đánh giá thành công.";
		} catch (Exception e) {
			return e.getMessage();
		}
	}
	@RequestMapping("/getPhieuDanhGia")
	public DanhGiaResponse createEvaluate( @RequestBody(required = true) GetDanhGiaRequest danhgiaRequest) {
		System.out.println("masv:"+ danhgiaRequest.maSinhVien);
		return  danhgiaService.getEvaluate(danhgiaRequest);
			
		
	}
	
	@RequestMapping("/updateDiemBCS")
	public String updateDiemBCS( @RequestBody(required = true) DanhGia danhgiaRequest)  {
		try {
			danhgiaService.updateDiemBCS(danhgiaRequest);
			return  "Cập nhật điểm thành công";
		} catch (Exception e) {
			// TODO: handle exception
			return "";
		}
		
	}
	
	@RequestMapping("/checkEvaluate")
	public CheckDanhGiaResponse checkEvaluate( @RequestBody(required = true) GetDanhGiaRequest danhgiaRequest)  {
		try {
			return danhgiaService.checkEvaluate(danhgiaRequest);
		} catch (Exception e) {
			// TODO: handle exception
			System.out.println(e.getMessage());
			return null;
		}
		
	}
	
	@RequestMapping("/returnEvaluateBCS")
	public String returnEvaluateBCS( @RequestBody(required = true) List<String> danhgiaRequest)  {
		
		 danhgiaService.returnEvaluateBCS(danhgiaRequest);
		 return "Trả điểm cho Sinh viên thành công";
	}

	@RequestMapping("/getDiemXepLoai")
	public DiemXepLoaiResponse getDiemXepLoai( @PathParam("maPhieuDanhGia") String maPhieuDanhGia)  {
		return  danhgiaService.getDiemXepLoai(maPhieuDanhGia);
	
	}
	
	@RequestMapping("/sendEvaluateByBCS")
	public String sendEvaluateByBCS( @RequestBody(required = true) List<String> listDanhGia ,
			@PathParam("maTrangThaiLop") String maTrangThaiLop)  {
		System.out.println(listDanhGia);
		danhgiaService.sendEvaluateByBCS(listDanhGia, maTrangThaiLop);
		return "Gửi đánh giá cho CVHT thành công";
	
	}
	@RequestMapping("/returnEvaluateByCVHT")
	public String returnEvaluateCVHT( @PathParam("maLop") String maLop, @PathParam("maHK") String maHK, @PathParam("maNH") String maNH )  {
		danhgiaService.returnEvaluateCVHT(maLop, maHK, maNH);
		return "trả đánh giá cho BCS Lớp thành công";
	
	}
}
