package com.quanlydrl.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.quanlydrl.entity.ChiTietPhieuDanhGia;

@Repository
public interface ChiTietPhieuDanhGiaRepository  extends JpaRepository<ChiTietPhieuDanhGia, String>{

	@Query(value = "select * from chi_tiet_phieu_danh_gia"
				+ " where ma_phieu_danh_gia = :maPhieuDanhGia", nativeQuery = true)
	public List<ChiTietPhieuDanhGia> getDetailEvaluate(@Param("maPhieuDanhGia") String maPhieuDanhGia);
	
	@Transactional//đây là là một cái giao dịch
	@Modifying//định nghĩa giao dịch này có thê update/delete/insert
	@Query(value = "update chi_tiet_phieu_danh_gia set diembcs = :diemBCS , diemcvht = :diemBCS , diemhdk = :diemBCS"
			+ " where ma_chi_tiet_phieu_danh_gia = :maChiTietPhieuDanhGia", nativeQuery = true)
	public void updateDiemBCS(@Param("maChiTietPhieuDanhGia") String maChiTietPhieuDanhGia, @Param("diemBCS") int diemBCS);
	
}
