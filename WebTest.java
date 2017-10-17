package selenium.tests;

import static org.junit.Assert.*;

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

	/*
	@Test
	public void googleExists() throws Exception
	{
		driver.get("http://www.google.com");
        assertEquals("Google", driver.getTitle());		
	}
	*/

	@Test // The total number of studies closed is 5.
	public void Closed() throws Exception
	{
		driver.get("http://www.checkbox.io/studies.html");
		
		// http://geekswithblogs.net/Aligned/archive/2014/10/16/selenium-and-timing-issues.aspx
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@class='status']/span[.='CLOSED']")));
		List<WebElement> spans = driver.findElements(By.xpath("//a[@class='status']/span[.='CLOSED']"));

		assertNotNull(spans);
		assertEquals(5, spans.size());
	}

	@Test // The participant count of "Frustration of Software Developers" is 55
	public void Verify55() throws Exception{
		driver.get("http://www.checkbox.io/studies.html");
		String titlexpath = "//div[@class='span8']//span[.='Frustration of Software Developers']";
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(titlexpath)));
		WebElement title = driver.findElement(By.xpath(titlexpath));
		WebElement next = title.findElement(By.xpath("../../following-sibling::div//span[@class='backers']"));
		assertNotNull(next);
		assertEquals(next.getText(),"55");
		
		
	}
	
	
	@Test // If a status of a study is open, you can click on a "Participate" button.
	public void Participate() throws Exception
	{
		driver.get("http://www.checkbox.io/studies.html");
		
		// http://geekswithblogs.net/Aligned/archive/2014/10/16/selenium-and-timing-issues.aspx
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[@class='status']/span[.='OPEN']")));
		WebElement spans = driver.findElement(By.xpath("//a[@class='status']/span[.='OPEN']"));
		WebElement button = spans.findElement(By.xpath("../following-sibling::div//button[@class='btn btn-info']"));
		assertNotNull(button);
		assertEquals("Participate", button.getText());
	}
	
	@Test // Check if the "Software Changes Survey" has a Amazon reward image.
	public void AmazonImage() throws Exception
	{
		driver.get("http://www.checkbox.io/studies.html");
		String titlexpath = "//div[@class='span8']//span[.='Software Changes Survey']";

		// http://geekswithblogs.net/Aligned/archive/2014/10/16/selenium-and-timing-issues.aspx
		WebDriverWait wait = new WebDriverWait(driver, 30);
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(titlexpath)));
		WebElement title = driver.findElement(By.xpath(titlexpath));
		WebElement image = title.findElement(By.xpath("../following-sibling::div[@class='award']//div[@data-bind='foreach: awards']//span//img[@src= '/media/amazongc-micro.jpg']"));

		
	
		assertNotNull(image);
	}

	
	
	
	
	@Test
	public void postMessage()
	{
		driver.get("https://skynet2017.slack.com/");

		// Wait until page loads and we can see a sign in button.
		WebDriverWait wait = new WebDriverWait(driver, 30);
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
		wait.until(ExpectedConditions.titleContains("general"));

		// Switch to #selenium-bot channel and wait for it to load.
		driver.get("https://skynet2017.slack.com/messages/D6VUF6W73");
		wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//*/div[@class='ql-editor ql-blank']")));
		//wait.until(ExpectedConditions.titleContains("selenium-bot"));

		List<WebElement> field = driver.findElements(By.xpath("//*/div[@class='ql-editor ql-blank']/p"));
		
		System.out.println(field.size());
		WebElement f = field.get(1);
		System.out.println(f.getText() + " " + f.getTagName());
		field.get(0).clear();
		field.get(0).sendKeys("hi");
		
		// Type something
		//WebElement messageBot = driver.findElement(By.id("hi"));
		//assertNotNull(messageBot);
		/*	
		Actions actions = new Actions(driver);
		actions.moveToElement(messageBot);
		actions.click();
		actions.sendKeys("hello world, from Selenium");
		actions.sensdKeys(Keys.RETURN);
		actions.build().perform();

		wait.withTimeout(3, TimeUnit.SECONDS).ignoring(StaleElementReferenceException.class);

		WebElement msg = driver.findElement(
				By.xpath("//span[@class='message_body' and text() = 'hello world, from Selenium']"));*/
		
		// assertNotNull(msg);
	}

	
	
	
}
