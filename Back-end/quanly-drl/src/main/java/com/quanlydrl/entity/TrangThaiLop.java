package com.quanlydrl.entity;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TrangThaiLop {
	@Id
	private String maTrangThai;
	private String maLop;
	private String maHocKi;
	private String maNamHoc;
	private int trangThai;
	
}
