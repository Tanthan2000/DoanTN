package com.quanlydrl.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "ChiTietPhieuDanhGia")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ChiTietPhieuDanhGia {

	@Id
	private String maChiTietPhieuDanhGia;
	private String maTieuChi;
	private int diemSV;
	private int diemBCS;
	private int diemCVHT;
	private int diemHDK;
	private String maPhieuDanhGia;

}
