package com.quanlydrl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.quanlydrl.entity.TrangThaiLop;

@Repository
public interface TrangThaiLopRespository extends JpaRepository<TrangThaiLop, String> {

	@Query(value = "select * from trang_thai_lop where ma_trang_thai = :maTrangThai", nativeQuery = true)
	public TrangThaiLop getById( @Param("maTrangThai") String maTrangThai);
	
	
	@Transactional//đây là là một cái giao dịch
	@Modifying//định nghĩa giao dịch này có thê update/delete/insert
	@Query(value = "update trang_thai_lop set trang_thai = :trangThai where ma_trang_thai = :maTrangThai", nativeQuery = true)
	public int updateStatus( @Param("maTrangThai") String maTrangThai, @Param("trangThai") int trangThai);
}
