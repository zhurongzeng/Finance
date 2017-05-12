package com.zachary.system.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

public class DateUtils {

	
	/**
	 * 获取年的信息
	 * @return
	 */
	public static List<String> getYears() {
		List<String> list = new ArrayList<String>();
		for (int i = 0; i < 11; i++) {
			Calendar c = Calendar.getInstance();
			c.add(Calendar.YEAR, -i);
			DateFormat df = new SimpleDateFormat("yyyy");
			list.add(df.format(c.getTime()));
		}
		return list;
	}

	/**
	 * 得当系统当前日期
	 * String 类型
	 * @return
	 */
	public static String getMothThisDate() {
		Date dt = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String date = sdf.format(dt);
		return date;
	}
	/**
	 * 得当系统当前日期 
	 * Date 类型
	 */
	public static Date getDate(){
		Date dt = new Date();
		return dt;
	}

	/**
	 * 得到本月的第一天
	 * 
	 * @return
	 */
	public static String getMonthFirstDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(calendar.getTime());
	}

	/**
	 * 得到本月的最后一天
	 * 
	 * @return
	 */
	public static String getMonthLastDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH,
				calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(calendar.getTime());
	}

	/**
	 * 得当系统当前時間  
	 * 格式 20161218121250 
	 * @return
	 */
	public static String getMothThisDateTime() {
		Date dt = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmssSSS");
		String date = sdf.format(dt);
		return date;
	}
	
	
	/**
	 * 得当系统当前時間
	 * 
	 * @return
	 */
	public static String getDateTime() {
		Date dt = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date = sdf.format(dt);
		return date;
	}
	
	/**
	 * 格式化时间
	 * 
	 * @return
	 */
	public static Date getDateTime(String time) throws Exception{
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = sdf.parse(time);
		return date;
	}
	
	/**
	 * 格式化时间
	 * 
	 * @return
	 */
	public static Date getDateTime(String time, String formate) throws Exception{
		SimpleDateFormat sdf = new SimpleDateFormat(formate);
		Date date = sdf.parse(time);
		return date;
	}
	
	public static String getDateString(String formate){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat(formate);
		return sdf.format(date);
	}
	
	public static String convertDateToStr(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(date);
	}
	public static String convertDateToDay(Date date){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}

	/**
	 * 获取分钟
	 * 
	 * @param startTime
	 * @param endTime
	 * @return
	 * @throws ParseException
	 */
	public static long getMin(String startTime, String endTime)
			throws ParseException {
		long nm = 1000 * 60;
		long diff;
		long min;
		// 获得两个时间的毫秒时间差
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		diff = sdf.parse(endTime).getTime() - sdf.parse(startTime).getTime();
		min = diff / nm;// 计算差多少天
		return min;
	}
	/**
	 *获取当前时间戳和四位随机数 
	 *
	 */
	public static String getDateAndRandom(){
		Date date=new Date();
		Random rd = new Random();
        int result =rd.nextInt(90)+1000;
        String randomid=date.getTime()+""+result;
		return randomid;
	}
}
