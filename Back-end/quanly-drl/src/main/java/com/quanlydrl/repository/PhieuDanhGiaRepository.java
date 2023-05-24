package com.quanlydrl.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.quanlydrl.entity.PhieuDanhGia;



@Repository
public interface PhieuDanhGiaRepository extends JpaRepository<PhieuDanhGia, String>{

	@Query(value = "select * from phieu_danh_gia", nativeQuery = true)
	public List<PhieuDanhGia> getAll();
	// function
	
	@Query(value = "select * from phieu_danh_gia "
			     + " where ma_phieu_danh_gia = :maPhieuDanhGia" , nativeQuery = true)
	public PhieuDanhGia getById(@Param("maPhieuDanhGia") String maPhieuDanhGia);
	
	@Transactional//đây là là một cái giao dịch
	@Modifying//định nghĩa giao dịch này có thê update/delete/insert
	@Query(value = "update phieu_danh_gia set trang_thai = :trangThai "
		     + " where ma_phieu_danh_gia = :maPhieuDanhGia" , nativeQuery = true)
	public int updateStatus(@Param("trangThai") int trangThai , @Param("maPhieuDanhGia") String maPhieuDanhGia);
	
	@Transactional
	@Modifying
	@Query(value = "update phieu_danh_gia set trang_thai = :trangThai "
		     + " where ma_phieu_danh_gia = :maPhieuDanhGia " , nativeQuery = true)
	public int sendEvaluateByBCS(@Param("trangThai") int trangThai , @Param("maPhieuDanhGia") String maPhieuDanhGia);
	
	@Transactional
	@Modifying
	@Query(value = "update phieu_danh_gia set trang_thai = :trangThai "
		     + " where ma_lop = :maLop and ma_hoc_ki = :maHK and ma_nam_hoc = :maNH"  , nativeQuery = true)
	public int returnEvaluateByCVHT(@Param("maLop") String maLop , @Param("maHK") String maHK, @Param("maNH") String maNH , @Param("trangThai") int trangThai);
	
	
}
