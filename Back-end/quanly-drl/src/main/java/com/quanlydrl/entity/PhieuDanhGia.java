package com.quanlydrl.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "PhieuDanhGia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PhieuDanhGia {

	@Id
	private String maPhieuDanhGia;
	private String maLop;
	private String maSinhVien;
	private String hoVaTen;
//	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date ngaySinh;
	private String maHocKi;
	private String maNamHoc;
	private int diemTong;
	private int trangThai;

}
