package selenium.tests;
import java.awt.*;
import java.awt.datatransfer.StringSelection;
import java.io.*;
import org.openqa.selenium.Keys;
import java.awt.Robot;
import java.awt.event.KeyEvent;
import java.awt.Toolkit;
import java.awt.datatransfer.StringSelection;

import static org.junit.Assert.*;

import java.io.File;
import java.util.List;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;


import io.github.bonigarcia.wdm.ChromeDriverManager;

public class WebTest
{
	private static WebDriver driver;
	
	@BeforeClass
	public static void setUp() throws Exception 
	{
		//driver = new HtmlUnitDriver();
		ChromeDriverManager.getInstance().setup();
		driver = new ChromeDriver();
	}
	
	@AfterClass
	public static void  tearDown() throws Exception
	{
		driver.close();
		driver.quit();
	}

	

	@Test
	public void greetingTest() throws Exception
	{
		driver.get("https://sourcerershack.slack.com/");

		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));

		// Find email and password fields.
		WebElement email = driver.findElement(By.id("email"));
		WebElement pw = driver.findElement(By.id("password"));

		// Enter our email and password
		// If running this from Eclipse, you should specify these variables in the run configurations.
		email.sendKeys("sshah14@ncsu.edu");
		pw.sendKeys("sourcerers");

		// Click
		WebElement signin = driver.findElement(By.id("signin_btn"));
		signin.click();

		// Wait until we go to general channel.
		//wait.until(ExpectedConditions.titleContains("general"));

		// Switch to #selenium-bot channel and wait for it to load.
		driver.get("https://sourcerershack.slack.com/messages/D7J0WNYGJ");
		wait.until(ExpectedConditions.titleContains("RiseToCode"));
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[@id=\"msg_input\"]/div[1]")));
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
		field.clear();
		
		
	}
	
	@Test
	public void uploadFile() throws Exception
	{
		// driver.get("https://sourcerershack.slack.com/");

//		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));
//
//		
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
	

		field.clear();
		field.sendKeys("upload file");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(2000);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='message_icon'][last()]")));
		List<WebElement> iconList = driver.findElements(By.xpath("//div[@class='message_icon'][last()]"));
		int size = iconList.size();
		System.out.println(size);
		
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[id][contains()]/div[2]/span/text()")));
		WebElement lastIcon = iconList.get(size - 1);
		WebElement content = lastIcon.findElement(By.xpath("../following-sibling::div[@class='message_content']/span"));
		System.out.println(content.getText());
		assertEquals("Please upload the code file", content.getText());
		WebElement upload = driver.findElement(By.xpath("//*[@id=\"primary_file_button\"]"));
		upload.click();
		Thread.sleep(2000);
		WebElement computer = driver.findElement(By.xpath("//*[@id=\"menu_items\"]/li[3]"));
		computer.click();
		Thread.sleep(2000);
	    //put path to your image in a clipboard
	    StringSelection ss = new StringSelection("C:\\Users\\rgsha\\Documents\\Projects\\Hackathon\\BOT\\bot.js");
	    Toolkit.getDefaultToolkit().getSystemClipboard().setContents(ss, null);
	    //imitate mouse events like ENTER, CTRL+C, CTRL+V
	    Robot robot = new Robot();
	    robot.keyPress(KeyEvent.VK_ENTER);
	    robot.keyRelease(KeyEvent.VK_ENTER);
	    robot.keyPress(KeyEvent.VK_CONTROL);
	    robot.keyPress(KeyEvent.VK_V);
	    robot.keyRelease(KeyEvent.VK_V);
	    robot.keyRelease(KeyEvent.VK_CONTROL);
	    robot.keyPress(KeyEvent.VK_ENTER);
	    robot.keyRelease(KeyEvent.VK_ENTER);
	    robot.keyRelease(KeyEvent.VK_ENTER);
		Thread.sleep(5000);
		//computer.sendKeys("/Users/siddhantshah1/eclipse-workspace/Algos HW 3/src/CoinChange.java");
		WebElement upload_button =driver.findElement(By.xpath("//*[@id='upload_dialog']/div[3]/div[1]/button[2]"));
		upload_button.click();
		Thread.sleep(10000);
		field.clear();
		field.sendKeys("1");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(4000);
		field.sendKeys("bye");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(5000);
		
		
		/*  For Windows
		  //open upload window
    upload.click();
    //put path to your image in a clipboard
    StringSelection ss = new StringSelection("C:\\IMG_3827.JPG");
    Toolkit.getDefaultToolkit().getSystemClipboard().setContents(ss, null);
    //imitate mouse events like ENTER, CTRL+C, CTRL+V
    Robot robot = new Robot();
    robot.keyPress(KeyEvent.VK_ENTER);
    robot.keyRelease(KeyEvent.VK_ENTER);
    robot.keyPress(KeyEvent.VK_CONTROL);
    robot.keyPress(KeyEvent.VK_V);
    robot.keyRelease(KeyEvent.VK_V);
    robot.keyRelease(KeyEvent.VK_CONTROL);
    robot.keyPress(KeyEvent.VK_ENTER);
    robot.keyRelease(KeyEvent.VK_ENTER);
    
    */
		
	}
	
	@Test
	public void uploadFileAltPath() throws Exception
	{
		// driver.get("https://sourcerershack.slack.com/");

//		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));
//
//		
		
		
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
		field.clear();
		field.sendKeys("hi");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(5000);
		field.clear();
		field.sendKeys("upload file");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(2000);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='message_icon'][last()]")));
		List<WebElement> iconList = driver.findElements(By.xpath("//div[@class='message_icon'][last()]"));
		int size = iconList.size();
		System.out.println(size);
		
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[id][contains()]/div[2]/span/text()")));
		WebElement lastIcon = iconList.get(size - 1);
		WebElement content = lastIcon.findElement(By.xpath("../following-sibling::div[@class='message_content']/span"));
		System.out.println(content.getText());
		assertEquals("Please upload the code file", content.getText());
		field.clear();
		field.sendKeys("Not uploading");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(10000);
		
	}
	
	
	@Test
	public void sendGithubLink() throws Exception
	{
		// driver.get("https://sourcerershack.slack.com/");

//		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
		field.clear();
		field.sendKeys("hi");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		field.clear();
		field.sendKeys("github link");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='message_icon'][last()]")));
		List<WebElement> iconList = driver.findElements(By.xpath("//div[@class='message_icon'][last()]"));
		int size = iconList.size();
		System.out.println(size);
		
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[id][contains()]/div[2]/span/text()")));
		WebElement lastIcon = iconList.get(size - 1);
		WebElement content = lastIcon.findElement(By.xpath("../following-sibling::div[@class='message_content']/span"));
		System.out.println(content.getText());
		assertEquals("Please provide the link to the raw file.", content.getText());
		field.clear();
		field.sendKeys("https://github.com/CSC-510/Course/blob/master/DataWorkshop.md");
		Thread.sleep(3000);

		field.sendKeys(Keys.RETURN);

		Thread.sleep(8000);
		field.sendKeys("2");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(4000);
		field.sendKeys("bye");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(2000);
		
	}
	
	@Test
	public void sendGithubLinkAltPath() throws Exception
	{
		// driver.get("https://sourcerershack.slack.com/");

//		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
		field.clear();
		field.sendKeys("hi");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		field.clear();
		field.sendKeys("github link");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[@class='message_icon'][last()]")));
		List<WebElement> iconList = driver.findElements(By.xpath("//div[@class='message_icon'][last()]"));
		int size = iconList.size();
		System.out.println(size);
		
		//wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*[id][contains()]/div[2]/span/text()")));
		WebElement lastIcon = iconList.get(size - 1);
		WebElement content = lastIcon.findElement(By.xpath("../following-sibling::div[@class='message_content']/span"));
		System.out.println(content.getText());
		assertEquals("Please provide the link to the raw file.", content.getText());
		field.clear();
		field.sendKeys("www.google.com");
		Thread.sleep(3000);

		field.sendKeys(Keys.RETURN);

		Thread.sleep(3000);
		field.sendKeys("bye");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(2000);
		
	}
	
	@Test
	public void docParser() throws Exception
	{
		// driver.get("https://sourcerershack.slack.com/");

//		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
//		wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("signin_btn")));
//
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
		field.clear();
		field.sendKeys("hi");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(4000);
		field.clear();
		field.sendKeys("define concat");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		

		Thread.sleep(3000);
		field.sendKeys("bye");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(2000);
		
	}
	
	
	@Test
	public void docParserAltPath() throws Exception
	{
		// driver.get("https://sourcerershack.slack.com/");

//		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 15);
//		
		WebElement field = driver.findElement(By.xpath("//*[@id=\"msg_input\"]/div[1]"));
		field.clear();
		field.sendKeys("hi");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		field.clear();
		field.sendKeys("define asdf");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(3000);
		

		Thread.sleep(3000);
		field.sendKeys("bye");
		field.sendKeys(Keys.RETURN);
		Thread.sleep(2000);
		field.sendKeys("hi");
		field.sendKeys(Keys.RETURN);

		Thread.sleep(4000);


		
	}
}
	
	
//	