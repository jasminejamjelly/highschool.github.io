import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import ptolemy.plot.*;

public class EasyPtPlot {

	public static void main(String[] args) throws IOException {

		// get precipitation data from files depending on station ID
		List<String>[] uni = getdata(1018598);
		List<String>[] gon = getdata(1018611);

		// creates a new dataset from the average of the two arrays
		List<Double>[] averagedata = getaverage(uni, gon);

		// sorts the data into year/month/date
		Double[][][] monthlydata = getmonthlydata(averagedata);

		//System.out.println(monthlydata[25][10][29]);
		// sum monthly totals and sort in format year/month
		Double[][] monthlytotals = monthlyaverages(monthlydata);
	
		// sum consecutive two day precipitation and find the maximum
		// two day total in each month in format year/month/date
		Double[][][] twodaymax = twodaymonthlymax(monthlydata);

		// formats data into format formatted date/precipitation amount
		String[][] formattedtotaldata = todateformat(monthlytotals);
		String[][] formattedmaxdata = todateformat(twodaymax); // data info / ppt

		// sorts top ten of each array based on precipitation amount
		String[][] toptotals = gettopten(formattedtotaldata);
		String[][] toptwototals = gettopten(formattedmaxdata);

		// prints top ten tables
		printtopten(toptwototals);
		printtopten(toptotals);

		// plots graphs of given data
		plotmonthlymaximums(twodaymax);
		plotmonthlytotals(monthlytotals);

	}

	// Preconditions: 2d array is sorted in decremental order
	// Postconditions: prints the first 10 data points in the array
	private static void printtopten(String[][] sorted) {

		int n = 0;

		for (int j = 0; j < 10; j++) {
			System.out.println((n + 1) + " " + sorted[0][j] + " - " + sorted[1][j] + " mm");
			n++;
		}
		System.out.println();
	}

	// Preconditions: 2d array is in the format date/precipitation amount
	// Postconditions: returns sorted array in decreasing order
	private static String[][] gettopten(String[][] formatteddata) {

		String[][] top = new String[2][10];
		double x = 0;

		for (int i = 0; i < 2; i++) {
			for (int j = 0; j < 10; j++) {
				top[i][j] = "-1";
			}
		}

		for (int i = 0; i < formatteddata[0].length; i++) {

			try {
				x = Double.parseDouble(formatteddata[1][i]);

				if (x > Double.parseDouble(top[1][0])) {

					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = top[1][5];
					top[1][5] = top[1][4];
					top[1][4] = top[1][3];
					top[1][3] = top[1][2];
					top[1][2] = top[1][1];
					top[1][1] = top[1][0];
					top[1][0] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = top[0][5];
					top[0][5] = top[0][4];
					top[0][4] = top[0][3];
					top[0][3] = top[0][2];
					top[0][2] = top[0][1];
					top[0][1] = top[0][0];
					top[0][0] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][1])) {
					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = top[1][5];
					top[1][5] = top[1][4];
					top[1][4] = top[1][3];
					top[1][3] = top[1][2];
					top[1][2] = top[1][1];
					top[1][1] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = top[0][5];
					top[0][5] = top[0][4];
					top[0][4] = top[0][3];
					top[0][3] = top[0][2];
					top[0][2] = top[0][1];
					top[0][1] = formatteddata[0][i];
				} else if (x > Double.parseDouble(top[1][2])) {

					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = top[1][5];
					top[1][5] = top[1][4];
					top[1][4] = top[1][3];
					top[1][3] = top[1][2];
					top[1][2] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = top[0][5];
					top[0][5] = top[0][4];
					top[0][4] = top[0][3];
					top[0][3] = top[0][2];
					top[0][2] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][3])) {

					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = top[1][5];
					top[1][5] = top[1][4];
					top[1][4] = top[1][3];
					top[1][3] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = top[0][5];
					top[0][5] = top[0][4];
					top[0][4] = top[0][3];
					top[0][3] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][4])) {
					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = top[1][5];
					top[1][5] = top[1][4];
					top[1][4] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = top[0][5];
					top[0][5] = top[0][4];
					top[0][4] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][5])) {

					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = top[1][5];
					top[1][5] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = top[0][5];
					top[0][5] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][6])) {

					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = top[1][6];
					top[1][6] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = top[0][6];
					top[0][6] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][7])) {

					top[1][9] = top[1][8];
					top[1][8] = top[1][7];
					top[1][7] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = top[0][7];
					top[0][7] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][8])) {
					top[1][9] = top[1][8];
					top[1][8] = Double.toString(x);

					top[0][9] = top[0][8];
					top[0][8] = formatteddata[0][i];

				} else if (x > Double.parseDouble(top[1][9])) {
					top[1][9] = Double.toString(x);

					top[0][9] = formatteddata[0][i];
				}
			} catch (Exception e) {
				continue;

			}
		}

		return top;
	}

	// Preconditions: 3d array is in format year/month/date expressed in integers
	// Postconditions: returns array in format formatteddate/precipitation amount
	private static String[][] todateformat(Double[][] monthlytotal) {

		String[][] formatteddates = new String[2][monthlytotal.length * monthlytotal[0].length * 365]; // yearmonthdate

		int n = 0;
		for (int i = 0; i < monthlytotal.length; i++) {

			for (int j = 0; j < 12; j++) {
				String month = "";

				if (monthlytotal[i][j] != null) {

					month = getmonth(j);

					formatteddates[0][n] = month + " "+ (i + 1995);
					formatteddates[1][n] = (monthlytotal[i][j]).toString();

					n++;
				}
			}
		}
		return formatteddates;
	}

	// Preconditions: j is an integer from 0-11
	// Postconditions: returns month as a string
	private static String getmonth(int j) {
		String month = "";

		switch (j) {

		case 0:
			month = "Jan";
			break;
		case 1:
			month = "Feb";
			break;
		case 2:
			month = "Mar";
			break;
		case 3:
			month = "Apr";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "Jun";
			break;
		case 6:
			month = "Jul";
			break;
		case 7:
			month = "Aug";
			break;
		case 8:
			month = "Sep";
			break;
		case 9:
			month = "Oct";
			break;
		case 10:
			month = "Nov";
			break;
		case 11:
			month = "Dec";
			break;

		} // switch
		return month;
	}

	// Preconditions: 3d array is in format year/month/date expressed in integers
	// Postconditions: returns array in format formatteddate/precipitation amount
	private static String[][] todateformat(Double[][][] monthlymax) {

		String[][] formatteddates = new String[2][monthlymax.length * monthlymax[0].length * 365]; // yearmonthdate

		int n = 0;
		for (int i = 0; i < monthlymax.length; i++) {

			for (int j = 0; j < 12; j++) {
				String month = "";

				for (int k = 0; k < 31; k++) {
					if (monthlymax[i][j][k] != null) {

						month = getmonth(j);

						formatteddates[0][n] = month + " " + (k)+ "-" + (k+1) + " " +(i + 1995);
						formatteddates[1][n] = (monthlymax[i][j][k]).toString();

						n++;
					}

				}
			}
		}
		return formatteddates;
	}

	// Preconditions: 2d array is an array of format year/month
	// Postconditions: plots monthly totals in chronological order
	private static void plotmonthlytotals(Double[][] monthlytotal) {

		Plot plotObj = new Plot(); // Create Plot object

		plotObj.setTitle("Total Monthly Rainfall");
		plotObj.setXLabel("Year");
		plotObj.setYLabel("Rainfall (mm)");

		double n = 0;

		for (int i = 0; i < 28; i++) {

			for (int j = 0; j < 12; j++) {
				plotObj.addPoint(0, (n / 12.0) + 1995, 0, false);
				plotObj.addPoint(0, (n / 12.0) + 1995, monthlytotal[i][j], true);
				n += 1;
			}
		}

		PlotApplication app = new PlotApplication(plotObj); // Display
	}

	// Preconditions: 3d array is an array of format year/month/date
	// Postconditions: plots monthy 2 day maximums in chronological order
	private static void plotmonthlymaximums(Double[][][] monthlymax) {

		Plot twoDayMax = new Plot(); // Create Plot object

		twoDayMax.setTitle("Maximum Rainfall Over two Days");
		twoDayMax.setXLabel("Year");
		twoDayMax.setYLabel("Rainfall (mm)");
		double m = 0;
		for (int i = 0; i < 28; i++) {

			for (int j = 0; j < 12; j++) {
				for (int k = 0; k < 31; k++) {
					if (monthlymax[i][j][k] != null) {

						twoDayMax.addPoint(0, (m / 12) + 1995, 0, false);
						twoDayMax.addPoint(0, (m / 12) + 1995, monthlymax[i][j][k], true);
						m++;

					}
				}

			}
		}

		PlotApplication app1 = new PlotApplication(twoDayMax); // Display

	}

	// Preconditions: 3d array is an array of format year/month/date
	// Postconditions: returns array of two day maxs in form year/month/date
	private static Double[][][] twodaymonthlymax(Double[][][] monthlydata) {
		Double[][][] twodaymax = new Double[28][12][31];

		int date = 0;
		for (int i = 0; i < 28; i++) {
			for (int j = 0; j < 12; j++) {
				double max = 0;
				for (int k = 0; k < 31; k++) {
					if (monthlydata[i][j][k] != null && monthlydata[i][j][k] != -1) {
						try {
							if ((monthlydata[i][j][k] + monthlydata[i][j][k + 1]) >= max) {

								max = monthlydata[i][j][k] + monthlydata[i][j][k + 1];
								date = k;

							}
						} catch (Exception e) {
							if ((monthlydata[i][j][k]) > max) {

								max = monthlydata[i][j][k];
								date = k;

							}
							continue;
						}
					}

				}
				twodaymax[i][j][date] = max;

			}

		}
		return twodaymax;
	}

	// Preconditions: 3d array is an array of format year/month/date
	// Postconditions: returns array of monthly precipitation totals in form
	// year/month
	private static Double[][] monthlyaverages(Double[][][] monthlydata) {

		Double[][] averages = new Double[28][12];
		
		double sum = 0;

		for (int i = 0; i < 28; i++) {

			for (int j = 0; j < 12; j++) {			
				sum = 0;
				for (int k = 0; k < 33; k++) {

					if (monthlydata[i][j][k] != null && monthlydata[i][j][k] != -1) {

						sum += monthlydata[i][j][k];
					}

					averages[i][j] = sum;

				}
			}
		}

		return averages;
	}

	// Preconditions: Array is an array of arraylists of precipitation amounts per
	// year
	// Postconditions: returns 3d array in form year/month/date
	private static Double[][][] getmonthlydata(List<Double>[] average) {

		Double[][][] monthlydata = new Double[average.length][12][300]; // year, month

		int month = 0;
		int date = 0;
		int leap = 0;
		
		for (int i = 0; i < 28; i++) {
			leap =0;
			if((i+1995)%4==0) {
				leap = 1;
			}
			
			// for each day
			for (int j = 0; j < (364+leap); j++) {
				if (j < 31) {
					month = 1;
					date = j;

				} else if (j < 59+leap) {
					month = 2;
					date = j - 30;
				} else if (j < 90+leap) {
					month = 3;
					date = j - 58;
				} else if (j < 120+leap) {
					month = 4;
					date = j - 89;
				} else if (j < 151+leap) {
					month = 5;
					date = j - 119;
				} else if (j < 181+leap) {
					month = 6;
					date = j - 150;
				} else if (j < 212+leap) {
					month = 7;
					date = j - 180;
				} else if (j < 212+leap) {
					month = 7;
					date = j - 180;
				} else if (j < 243+leap) {
					month = 8;
					date = j - 211;
				} else if (j < 273+leap) {
					month = 9;
					date = j - 242;
				} else if (j < 304+leap) {
					month = 10;
					date = j - 272;
				} else if (j < 334) {
					month = 11;
					date = j - 303;
				} else {
					month = 12;
					date = j - 333;
				}
				
				monthlydata[i][month - 1][date] = average[i].get(j);

			} // for

		} // for

		return monthlydata;
	}

	// Preconditions: two arrays are of integers in string form
	// Postconditions: returns an averaged dataset of the two arrays
	private static List<Double>[] getaverage(List<String>[] uni, List<String>[] gon) {

		List<Double>[] average = new List[uni.length];

		for (int i = 0; i < 28; i++) {

			ArrayList<Double> ar = new ArrayList<Double>(); // new list for each year

			for (int j = 0; j < (uni[i].size() - 1); j++) {

				if (!gon[i].get(j).equals("-1") && !uni[i].get(j).equals("-1")) {
					ar.add(((Double.parseDouble(uni[i].get(j))) + (Double.parseDouble(gon[i].get(j)))) / 2);
				} else if (gon[i].get(j).equals("-1") && !uni[i].get(j).equals("-1")) {
					ar.add((Double.parseDouble(uni[i].get(j))));
				} else if (!gon[i].get(j).equals("-1") && uni[i].get(j).equals("-1")) {
					ar.add((Double.parseDouble(gon[i].get(j))));
				} else {
					ar.add(null);
				}
			}

			average[i] = ar;
		}

		return average;
	}

	// Preconditions: stationID is valid
	// Postconditions: reads in data from spreadsheets
	private static List<String>[] getdata(int stationID) throws IOException {

		List<String>[] yearlydata = new List[28];

		for (int i = 0; i < 28; i++) {

			BufferedReader in = new BufferedReader(new FileReader(
					"src/weather/" + "en_climate_daily_BC_" + stationID + "_" + (i + 1995) + "_P1D.csv"));
			String[] lines = in.lines().toArray(String[]::new);
			ArrayList<String> ar = new ArrayList<String>();

			for (int j = 1; j < lines.length; j++) {

				String[] arr = lines[j].split("\",\"");
				// clean data

				if (arr[24].equals("M") || arr[23].equals("") || arr[23].equals(null)) {
					arr[23] = ("-1");
				}
				ar.add(arr[23]);

				yearlydata[i] = ar;
			}

		}
		return yearlydata;

	}
}